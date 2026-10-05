const fs=require('fs');
const {chromium}=require('C:/Users/ServiceSupport/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'}),results=[];
for(const viewport of [{width:375,height:667},{width:390,height:740},{width:1024,height:768}]){
 const page=await browser.newPage({viewport});await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 const data=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,titleTop:document.querySelector('h1').getBoundingClientRect().top,headerBottom:document.querySelector('header').getBoundingClientRect().bottom}));
 await page.screenshot({path:`qa/screenshots/home-${viewport.width}x${viewport.height}.png`});results.push({...viewport,...data,pass:!data.overflow&&data.titleTop>data.headerBottom});await page.close();
}fs.writeFileSync('qa/short-screen-report.json',JSON.stringify(results,null,2));console.log(results);await browser.close();if(results.some(r=>!r.pass))process.exitCode=1;})().catch(e=>{console.error(e.message);process.exit(1);});
