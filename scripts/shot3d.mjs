// Visual rotation-coverage test: screenshots the site at fixed scroll
// positions through multiple rotation phases (/model float cycles).
import puppeteer from 'puppeteer-core';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const URL = 'http://localhost:4199/';
const OUT = 'C:/Users/ANIKET~1/AppData/Local/Temp/opencode/shots';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1440,900'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
// preloader (~3.3s) gates scrolling on the site
await new Promise((r) => setTimeout(r, 5200));

const getMax = () => page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const max = await getMax();
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 300));

// scroll fractions; sculptures re-assemble + rotate through phases
const stops = [0, 0.12, 0.28, 0.45, 0.6, 0.78, 0.95, 1.0];
for (let i = 0; i < stops.length; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(max * stops[i]));
  // hold live so float/spin phases advance differently per stop
  await new Promise((r) => setTimeout(r, 2600 + i * 700));
  await page.screenshot({ path: path.join(OUT, `rot_${String(i).padStart(2, '0')}_${stops[i]}.png`) });
  console.log('saved', stops[i]);
}
await browser.close();
console.log('DONE');
