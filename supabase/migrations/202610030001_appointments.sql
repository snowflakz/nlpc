-- Apply to the project's existing Supabase/Bolt Postgres database.
begin;
create table if not exists public.appointments (
 id uuid primary key default gen_random_uuid(),
 reference_number text not null unique default ('NLPC-' || upper(gen_random_uuid()::text)),
 request_key uuid not null unique,
 payload_hash text not null,
 client_hash text not null,
 full_name text not null check (char_length(full_name) between 2 and 120),
 phone text not null check (phone ~ '^\+?[0-9 ()-]{7,25}$'),
 email text,
 preferred_date date not null,
 preferred_time text not null check (preferred_time in ('Morning','Afternoon','No preference')),
 service text not null check (service in ('medical-consultancy','medical-laboratory','audiological-assessment','optometry','dental','pharmacy','dialysis')),
 message text not null default '' check (char_length(message)<=2000),
 preferred_contact_method text not null check (preferred_contact_method in ('Phone','WhatsApp','Email')),
 status text not null default 'New' check (status in ('New','Confirmed','Rescheduled','Completed','Cancelled')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check (preferred_contact_method<>'Email' or (email is not null and char_length(email)>0))
);
alter table public.appointments enable row level security;
revoke all on public.appointments from anon, authenticated;
grant all on public.appointments to service_role;
-- No public SELECT/UPDATE/DELETE policies. Only the server service role may operate.
create index if not exists appointments_rate_limit on public.appointments(client_hash,created_at);
create or replace function public.touch_appointment() returns trigger language plpgsql set search_path=public,pg_temp as $$
begin new.updated_at=now();return new;end;$$;
drop trigger if exists appointments_updated_at on public.appointments;
create trigger appointments_updated_at before update on public.appointments for each row execute function public.touch_appointment();
create or replace function public.submit_appointment(p_request_key uuid,p_payload_hash text,p_client_hash text,p_input jsonb)
returns text language plpgsql security definer set search_path=public,pg_temp as $$
declare existing public.appointments; result text;
begin
 if jsonb_typeof(p_input)<>'object' or p_payload_hash !~ '^[0-9a-f]{64}$' or p_client_hash !~ '^[0-9a-f]{64}$' then raise exception 'INVALID_INPUT';end if;
 perform pg_advisory_xact_lock(hashtextextended(p_request_key::text,0));
 select * into existing from public.appointments where request_key=p_request_key;
 if found then
  if existing.payload_hash<>p_payload_hash then raise exception 'IDEMPOTENCY_CONFLICT';end if;
  return existing.reference_number;
 end if;
 perform pg_advisory_xact_lock(hashtextextended(p_client_hash,1));
 if (select count(*) from public.appointments where client_hash=p_client_hash and created_at>now()-interval '1 hour')>=5 then raise exception 'RATE_LIMIT';end if;
 if (p_input->>'preferred_date')::date < (now() at time zone 'Africa/Lagos')::date then raise exception 'INVALID_DATE';end if;
 if coalesce(p_input->>'email','')<>'' and (char_length(p_input->>'email')>254 or p_input->>'email' !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then raise exception 'INVALID_EMAIL';end if;
 insert into public.appointments(request_key,payload_hash,client_hash,full_name,phone,email,preferred_date,preferred_time,service,message,preferred_contact_method)
 values(p_request_key,p_payload_hash,p_client_hash,btrim(p_input->>'full_name'),p_input->>'phone',nullif(p_input->>'email',''),(p_input->>'preferred_date')::date,p_input->>'preferred_time',p_input->>'service',coalesce(p_input->>'message',''),p_input->>'preferred_contact_method')
 returning reference_number into result;
 return result;
end;$$;
revoke all on function public.submit_appointment(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.submit_appointment(uuid,text,text,jsonb) to service_role;
commit;
