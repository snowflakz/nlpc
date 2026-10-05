import { z } from 'zod';
import { SERVICES } from './constants';
export function lagosDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Lagos',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a valid date.').refine(value => {
 const parsed = new Date(value + 'T12:00:00Z');
 return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0,10) === value && value >= lagosDate();
}, 'Choose today or a future date.');
export const appointmentSchema = z.object({
 full_name:z.string().trim().min(2,'Enter your full name.').max(120),
 phone:z.string().trim().regex(/^\+?[0-9 ()-]{7,25}$/,'Enter a valid phone number.').refine(s=>s.replace(/\D/g,'').length>=7 && s.replace(/\D/g,'').length<=15,'Enter a valid phone number.'),
 email:z.union([z.literal(''),z.string().trim().email('Enter a valid email.').max(254)]).default(''),
 preferred_date:date,
 preferred_time:z.enum(['Morning','Afternoon','No preference']),
 service:z.string().refine(s=>SERVICES.some(service=>service.slug===s),'Choose one of our seven services.'),
 message:z.string().trim().max(2000,'Keep your message under 2,000 characters.').default(''),
 preferred_contact_method:z.enum(['Phone','WhatsApp','Email']),
 website:z.string().max(0).optional(),
}).strict().superRefine((data,ctx)=>{if(data.preferred_contact_method==='Email'&&!data.email)ctx.addIssue({code:z.ZodIssueCode.custom,path:['email'],message:'An email address is required for email contact.'});});
export type AppointmentInput=z.infer<typeof appointmentSchema>;
