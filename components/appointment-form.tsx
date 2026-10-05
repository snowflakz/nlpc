'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import { appointmentSchema, lagosDate, type AppointmentInput } from '@/lib/appointment-validation';
const fields=[['full_name','Full name','text','name'],['phone','Phone','tel','tel'],['email','Email (optional unless choosing email contact)','email','email'],['preferred_date','Preferred date','date','off']] as const;
export function AppointmentForm(){
 const successRef=useRef<HTMLElement>(null);
 const formRef=useRef<HTMLFormElement>(null),lock=useRef(false),attempt=useRef({payload:'',key:''});
 const [busy,setBusy]=useState(false),[errors,setErrors]=useState<Record<string,string[]|undefined>>({}),[error,setError]=useState(''),[success,setSuccess]=useState<{reference:string;input:AppointmentInput}|null>(null);
 useEffect(()=>{if(success)successRef.current?.focus();},[success]);
 useEffect(()=>{const service=new URLSearchParams(window.location.search).get('service');const select=formRef.current?.elements.namedItem('service') as HTMLSelectElement|null;if(select&&SERVICES.some(s=>s.slug===service))select.value=service!;},[]);
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();if(lock.current)return;
  const form=event.currentTarget,body=Object.fromEntries(new FormData(form)),parsed=appointmentSchema.safeParse(body);setError('');setErrors({});
  if(!parsed.success){const next=parsed.error.flatten().fieldErrors;setErrors(next);const first=Object.keys(next)[0];(form.elements.namedItem(first) as HTMLElement|null)?.focus();return;}
  const payload=JSON.stringify(parsed.data);
  if(attempt.current.payload!==payload)attempt.current={payload,key:crypto.randomUUID()};
  lock.current=true;setBusy(true);const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch('/api/appointments',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':attempt.current.key},body:payload,signal:controller.signal});
   const result=await response.json();
   if(!response.ok){setErrors(result.fields||{});setError(result.error||'Unable to send your request. Please try again.');return;}
   if(typeof result.reference_number!=='string'){setError('We could not verify receipt. Retry or contact the clinic.');return;}
   setSuccess({reference:result.reference_number,input:parsed.data});
  }catch{setError('We could not verify receipt because the connection was interrupted. Retry without changing the form, or contact the clinic.');}
  finally{clearTimeout(timeout);lock.current=false;setBusy(false);}
 }
 if(success)return <section ref={successRef} tabIndex={-1} aria-live="polite" className="border-t-2 border-primary bg-accent p-6 sm:p-10"><p className="eyebrow">Request received</p><h2 className="mt-4 font-display text-3xl">Thank you, {success.input.full_name}.</h2><p className="mt-4">The clinic will contact you to confirm availability. Your appointment is not yet confirmed.</p><p className="mt-6 text-sm">Your reference</p><p className="mt-2 break-all font-mono text-sm font-semibold">{success.reference}</p><dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm"><dt>Service</dt><dd>{SERVICES.find(s=>s.slug===success.input.service)?.name}</dd><dt>Preferred date</dt><dd>{success.input.preferred_date}</dd><dt>Preferred time</dt><dd>{success.input.preferred_time}</dd><dt>Contact method</dt><dd>{success.input.preferred_contact_method}</dd></dl><Link className="action-primary mt-8" href="/contact">Contact the clinic</Link></section>;
 const props=(name:string)=>({id:name,name,'aria-invalid':Boolean(errors[name]),'aria-describedby':errors[name]?`${name}-error`:undefined,className:'form-control'});
 const feedback=(name:string)=>errors[name]&&<p id={`${name}-error`} className="mt-2 text-sm text-destructive">{errors[name]?.[0]}</p>;
 return <form ref={formRef} onSubmit={submit} noValidate aria-busy={busy} className="space-y-7">
 <p className="text-sm text-muted-foreground">Required fields are marked *. Please avoid detailed medical histories in your message.</p>
 {error&&<div role="alert" className="border-l-2 border-destructive bg-accent p-4">{error}</div>}
 <div className="grid gap-6 sm:grid-cols-2">{fields.map(([name,label,type,auto])=><div key={name}><label htmlFor={name} className="form-label">{label}{name!=='email'?' *':''}</label><input {...props(name)} type={type} autoComplete={auto} min={type==='date'?lagosDate():undefined} required={name!=='email'} maxLength={name==='full_name'?120:name==='phone'?25:name==='email'?254:undefined} />{feedback(name)}</div>)}
 <div><label htmlFor="preferred_time" className="form-label">Preferred time *</label><select {...props('preferred_time')} defaultValue="No preference">{['Morning','Afternoon','No preference'].map(s=><option key={s}>{s}</option>)}</select>{feedback('preferred_time')}</div>
 <div><label htmlFor="service" className="form-label">Service *</label><select {...props('service')} defaultValue="" required><option value="" disabled>Choose a service</option>{SERVICES.map(s=><option key={s.slug} value={s.slug}>{s.name}</option>)}</select>{feedback('service')}</div></div>
 <div><label htmlFor="message" className="form-label">Message / reason for visit (optional)</label><textarea {...props('message')} rows={4} maxLength={2000} />{feedback('message')}</div>
 <div><label htmlFor="preferred_contact_method" className="form-label">Preferred contact method *</label><select {...props('preferred_contact_method')} defaultValue="Phone">{['Phone','WhatsApp','Email'].map(s=><option key={s}>{s}</option>)}</select>{feedback('preferred_contact_method')}</div>
 <div hidden aria-hidden="true"><label htmlFor="website">Leave blank</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
 <p className="text-sm text-muted-foreground">Read our <Link className="underline" href="/privacy">draft privacy notice</Link> for information about this form.</p>
 <button className="action-primary disabled:opacity-60" disabled={busy} type="submit">{busy?'Sending request…':'Send appointment request'}</button>
 <p className="text-sm text-muted-foreground">The requested date and time are preferences. The clinic will contact you to confirm availability.</p>
 </form>;
}
