import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHash, createHmac } from 'crypto';
import { trustedClientAddress } from '@/lib/request-client';
import { appointmentSchema } from '@/lib/appointment-validation';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
function respond(data:object,status:number){return NextResponse.json(data,{status,headers});}
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(origin && origin!==new URL(request.url).origin)return respond({error:'This request is not allowed.'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return respond({error:'Send a JSON request.'},415);
 const requestKey=request.headers.get('idempotency-key');
 if(!requestKey || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestKey))return respond({error:'Refresh the form and try again.'},400);
 let body:unknown;
 try{
  const reader=request.body?.getReader();if(!reader)return respond({error:'The form is empty.'},400);
  let bytes=0,text='';const decoder=new TextDecoder();
  while(true){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;if(bytes>16384){await reader.cancel();return respond({error:'Your request is too large.'},413);}text+=decoder.decode(chunk.value,{stream:true});}
  text+=decoder.decode();body=JSON.parse(text);
 }catch{return respond({error:'The request could not be read. Try again.'},400);}
 const parsed=appointmentSchema.safeParse(body);
 if(!parsed.success)return respond({error:'Please check the highlighted fields.',fields:parsed.error.flatten().fieldErrors},422);
 const url=process.env.SUPABASE_URL,secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!secret)return respond({error:'Online requests are unavailable. Please call or WhatsApp the clinic.'},503);
 const {website,...input}=parsed.data;
 // Platform-aware identity supports Vercel and the legacy Netlify deployment.
 const clientAddress=trustedClientAddress(request.headers);
 const clientHash=createHmac('sha256',secret).update(clientAddress).digest('hex');
 const payloadHash=createHash('sha256').update(JSON.stringify(input)).digest('hex');
 try{
  const db=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await db.rpc('submit_appointment',{p_request_key:requestKey,p_payload_hash:payloadHash,p_client_hash:clientHash,p_input:input});
  if(error){if(error.message==='RATE_LIMIT')return respond({error:'Too many requests. Please contact the clinic directly.'},429);if(error.message==='IDEMPOTENCY_CONFLICT')return respond({error:'This request has already been used. Start a new request.'},409);return respond({error:'Your request could not be saved. Try again or call the clinic.'},503);}
  if(typeof data!=='string'||!data.startsWith('NLPC-'))return respond({error:'We could not verify receipt. Retry the same request or contact the clinic.'},503);
  return respond({reference_number:data,message:'Request received. The clinic will contact you to confirm availability.'},201);
 }catch{return respond({error:'Unable to connect. Please retry or contact the clinic.'},503);}
}
