const fs=require('fs');
const {chromium,webkit}=require('C:/Users/ServiceSupport/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),results=[];
 const profiles=[['iphone-small',375,667,true],['iphone',390,844,true],['android',412,915,true],['phone-landscape',844,390,true],['ipad',768,1024,true],['ipad-landscape',1024,768,true],['tablet-wide',1194,834,true],['ipad-pro-landscape',1366,1024,true],['desktop',1440,900,false]];
 for(const [name,width,height,touch] of profiles.filter(p=>!process.argv.includes('--large-tablet')||['ipad-pro-landscape','desktop'].includes(p[0]))){
  const context=await browser.newContext({viewport:{width,height},isMobile:touch,hasTouch:touch,deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/contact','/appointment','/services','/services/optometry']){
   await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,phone:[...document.querySelectorAll('a[href^="tel:"]')].every(a=>a.getAttribute('href')==='tel:+12526914076'),email:[...document.querySelectorAll('a[href^="mailto:"]')].every(a=>a.getAttribute('href')==='mailto:newlifepolyclinic26@gmail.com'),whatsapp:[...document.querySelectorAll('a[href*="wa.me"]')].every(a=>a.getAttribute('href')==='https://wa.me/2348023284834'),directions:[...document.querySelectorAll('a[href*="google.com/maps"]')].every(a=>{const u=new URL(a.href);return u.pathname==='/maps/dir/'&&u.searchParams.get('dir_action')==='navigate'&&u.searchParams.get('destination')==='132 Iju Road, Fagba, Ifako-Ijaye, Lagos, Nigeria';}),viewport:document.querySelector('meta[name=viewport]')?.content}));
   const menuVisible=await page.getByRole('button',{name:'Open navigation menu'}).isVisible();
   const dockVisible=await page.getByRole('navigation',{name:'Quick clinic actions'}).isVisible().catch(()=>false);
   let a11y=[];if(['/','/contact','/appointment'].includes(route)){await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});a11y=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));}
   const pass=!state.overflow&&state.phone&&state.email&&state.whatsapp&&state.directions&&menuVisible===touch&&dockVisible===(touch&&route!='/appointment')&&!a11y.length&&!errors.length;
   results.push({name,route,pass,...state,a11y,errors:[...errors],menuVisible,dockVisible});console.log(name,route,pass?'PASS':'FAIL');
   if(route==='/'||route==='/appointment')await page.screenshot({path:'qa/screenshots/device-'+name+(route==='/'?'-home':'-appointment')+'.png',fullPage:route==='/appointment'});
   if(route==='/'&&touch){await page.getByRole('button',{name:'Open navigation menu'}).click();await page.getByRole('dialog').getByRole('link',{name:'Optometry (Eyes)',exact:true}).click();await page.waitForURL('**/services/optometry');await page.getByRole('dialog').waitFor({state:'hidden'});results.push({name,test:'touch menu navigates and closes',pass:await page.getByRole('dialog').count()===0});}
   if(route==='/appointment'&&touch){await page.getByRole('button',{name:'Send appointment request'}).click();results.push({name,test:'touch form validation focus',pass:await page.evaluate(()=>document.activeElement.id==='full_name')});}
  }
  await context.close();
 }
 fs.writeFileSync(process.argv.includes('--large-tablet')?'qa/device-large-tablet-report.json':'qa/device-report.json',JSON.stringify({engine:'Microsoft Edge/Chromium with touch viewport emulation; not physical-device or Safari certification',webkitAvailable:fs.existsSync(webkit.executablePath()),results},null,2));await browser.close();if(results.some(r=>!r.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});