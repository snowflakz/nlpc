const fs=require('fs');
const {chromium}=require('C:/Users/ServiceSupport/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});const checks=[];
 const check=(test,pass,details)=>{checks.push({test,pass,details});console.log(test,pass?'PASS':'FAIL');};
 const page=await browser.newPage({viewport:{width:390,height:740}});
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 check('hero has finite entrance animations',await page.evaluate(()=>document.getAnimations().some(a=>a.effect.getTiming().iterations===1)));
 check('local hero and brand loaded',await page.evaluate(()=>document.querySelector('.hero-photo').currentSrc.includes('/images/eye-care-')&&document.querySelector('.brand-mark').naturalWidth>0));
 await page.locator('.service-links a').first().scrollIntoViewIfNeeded();await page.waitForTimeout(180);
 check('service scroll entrances active',await page.evaluate(()=>document.querySelector('.service-links a').getAnimations().length>0));
 check('reading progress follows scroll',await page.locator('.reading-progress').evaluate(el=>getComputedStyle(el).transform!=='matrix(0, 0, 0, 1, 0, 0)'));
 await page.locator('.service-links a').first().click();await page.waitForURL('**/services/medical-consultancy');await page.waitForTimeout(1000);
 check('client navigation attaches service motion',await page.locator('.service-hero-copy').getAttribute('data-motion-observed')==='true');
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
 check('preference change cancels running motion',await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length===0));
 for(const route of ['/','/services/optometry','/services/pharmacy','/appointment']){
  await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(120);
  check('reduced motion '+route,await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length===0&&getComputedStyle(document.querySelector('.reading-progress')).display==='none'));
 }
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:667}});
 await nojs.goto('http://127.0.0.1:3000/services/dental',{waitUntil:'networkidle'});
 check('content visible without JavaScript',await nojs.locator('h1').isVisible()&&await nojs.getByRole('link',{name:'Request an appointment',exact:true}).first().isVisible());
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.waitForTimeout(5000);await page.screenshot({path:'qa/screenshots/animated-home-390.png'});
 await page.goto('http://127.0.0.1:3000/services/optometry',{waitUntil:'networkidle'});await page.waitForTimeout(1200);await page.screenshot({path:'qa/screenshots/animated-optometry-390.png',fullPage:true});
 fs.writeFileSync('qa/motion-report.json',JSON.stringify(checks,null,2));await browser.close();if(checks.some(c=>!c.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
