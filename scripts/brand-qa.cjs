const fs=require('fs');
const {chromium}=require('C:/Users/ServiceSupport/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const checks=[];const check=(test,pass,details)=>{checks.push({test,pass,details});console.log(test,pass?'PASS':'FAIL');};
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 const homeImage=await page.locator('.hero-photo').getAttribute('src');
 await page.getByRole('button',{name:'Services',exact:true}).click();
 const menu=page.getByRole('menu');
 check('dropdown contains only eight title links',await menu.getByRole('menuitem').count()===8&&!await menu.innerText().then(t=>t.includes('Laboratory testing')||t.includes('Eye care and')));
 await page.screenshot({path:'qa/screenshots/brand-menu-1440.png'});
 await page.keyboard.press('Escape');
 const colors=await page.locator('.hero-actions a').evaluateAll(els=>els.slice(0,2).map(e=>getComputedStyle(e).backgroundColor));
 check('blue and green hero buttons have distinct filled colors',colors.length===2&&colors[0]!==colors[1]&&colors.every(c=>c!=='rgba(0, 0, 0, 0)'),colors);
 const icons=await page.locator('head link[rel*=icon]').evaluateAll(es=>es.map(e=>e.href));check('favicon metadata present',icons.some(u=>u.includes('favicon-32x32'))&&icons.some(u=>u.includes('apple-touch-icon')));
 const manifestUrl=await page.locator('head link[rel=manifest]').getAttribute('href');const manifest=await (await page.request.get('http://127.0.0.1:3000'+manifestUrl)).json();
 const assets=[...icons,...manifest.icons.map(i=>'http://127.0.0.1:3000'+i.src)];let iconsOk=true;for(const url of assets)if(!(await page.request.get(url)).ok())iconsOk=false;check('favicons and manifest icons return success',iconsOk);
 const serviceSlugs=['medical-consultancy','medical-laboratory','audiological-assessment','optometry','dental','pharmacy','dialysis'];const photos=[];
 for(const slug of serviceSlugs){await page.goto('http://127.0.0.1:3000/services/'+slug,{waitUntil:'networkidle'});photos.push(await page.locator('.service-hero-image img').getAttribute('src'));}
 check('seven distinct service images, separate from home hero',new Set(photos).size===7&&!photos.includes(homeImage),photos);
 await page.setViewportSize({width:375,height:667});await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.locator('footer').scrollIntoViewIfNeeded();
 const footerHeight=await page.locator('footer').evaluate(e=>e.getBoundingClientRect().height);
 check('compact phone footer without full service listing',footerHeight<550&&await page.locator('footer a[href^="/services/"]').count()===0,{height:footerHeight});
 await page.locator('footer').screenshot({path:'qa/screenshots/brand-footer-375.png'});
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'qa/screenshots/brand-home-375.png'});
 fs.writeFileSync('qa/brand-report.json',JSON.stringify(checks,null,2));await browser.close();if(checks.some(c=>!c.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});