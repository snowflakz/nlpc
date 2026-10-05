const fs=require('fs'),path=require('path');
const {chromium}=require('C:/Users/ServiceSupport/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});const results=[];
 const routes=process.argv.includes('--services')?['/','/services','/services/medical-consultancy','/services/medical-laboratory','/services/audiological-assessment','/services/optometry','/services/dental','/services/pharmacy','/services/dialysis']:['/','/about','/services','/services/medical-consultancy','/services/medical-laboratory','/services/audiological-assessment','/services/optometry','/services/dental','/services/pharmacy','/services/dialysis','/patient-information','/appointment','/contact','/privacy','/404'];
 const out=path.resolve('qa/screenshots');fs.mkdirSync(out,{recursive:true});
 for(const width of [375,390,430,768,1024,1440,1920]){
  const page=await browser.newPage({viewport:{width,height:900}});await page.addInitScript(()=>{window.__labVitals={lcp:0,cls:0};try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__labVitals.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__labVitals.cls+=e.value;}).observe({type:'layout-shift',buffered:true});}catch{}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error'&&!msg.text().includes('404'))errors.push(msg.text());});
  for(const route of routes){
   const response=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle',timeout:60000});await page.evaluate(()=>document.fonts.ready);await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);});await page.waitForLoadState('networkidle');await page.evaluate(async()=>{await Promise.all([...document.images].map(async img=>{img.loading='eager';try{await img.decode();}catch{}}));});
   const data=await page.evaluate(()=>({labVitals:window.__labVitals,title:document.title,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,canonical:document.querySelector('link[rel=canonical]')?.href,description:document.querySelector('meta[name=description]')?.content,ogTitle:document.querySelector('meta[property="og:title"]')?.content,twitterTitle:document.querySelector('meta[name="twitter:title"]')?.content,robots:[...document.querySelectorAll('meta[name=robots]')].map(e=>e.content),brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),missingAlt:[...document.images].filter(i=>!i.hasAttribute('alt')).length,links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}));
   let a11y=[];if([375,1440].includes(width)){await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const audit=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));a11y=audit.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));}
   const screenshot=path.join(out,(route==='/'?'home':route.slice(1).replaceAll('/','-'))+'-'+width+'.png');await page.screenshot({path:screenshot,fullPage:true});
   if([375,1440].includes(width))await page.screenshot({path:screenshot.replace('.png','-viewport.png')});results.push({route,width,a11y,status:response.status(),...data,errors:[...errors],screenshot});console.log(route,width,response.status(),data.overflow?'OVERFLOW':'ok',data.brokenImages.length?'BROKEN IMAGE':'');
  }
  if(width===375){
   await page.goto('http://127.0.0.1:3000/appointment');
   await page.getByRole('button',{name:'Send appointment request'}).click();
   results.push({test:'empty-form-validation',focus:await page.evaluate(()=>document.activeElement.id)});
   await page.getByRole('button',{name:'Open navigation menu'}).click();
   await page.keyboard.press('Tab');results.push({test:'mobile-menu',dialog:await page.getByRole('dialog').count()});await page.keyboard.press('Escape');
  }
  await page.close();
 }
 fs.writeFileSync('qa/visual-report.json',JSON.stringify(results,null,2));await browser.close();
 if(results.some(r=>r.a11y?.length||r.overflow||r.errors?.length||r.missingAlt||r.brokenImages?.length||r.h1!==undefined&&r.h1!==1||r.status!==undefined&&r.status!==(r.route==='/404'?404:200)))process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exit(1);});
