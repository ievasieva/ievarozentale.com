import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const required = { insightTimer: 'insightTimerUrl', instagram: 'instagramUrl', cv: 'cvUrl', practices: 'kitCheckoutUrl', workshopBooking: 'workshopBookingUrl' };
for (const [flag, key] of Object.entries(required)) {
  if (typeof cfg.features[flag] !== 'boolean') throw new Error(`${flag} must be true or false`);
  if (cfg.features[flag]) {
    let url; try { url = new URL(cfg.links[key]); } catch { throw new Error(`Add a real HTTPS link for ${key} before enabling ${flag}`); }
    if (url.protocol !== 'https:' || url.hostname === 'example.com' || url.hostname.endsWith('.example')) throw new Error(`${key} must be a real HTTPS URL`);
  }
}
if (cfg.features.workshopBooking && (!cfg.content.workshopDate.trim() || !cfg.content.workshopVenue.trim())) throw new Error('Add workshopDate and workshopVenue before enabling bookings');
const values = {...cfg.links, ...cfg.content};
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(text) {
  text = text.replace(/\{\{([#^])(\w+)\}\}([\s\S]*?)\{\{\/\2\}\}/g, (_, mode, flag, body) => {
    if (!(flag in cfg.features)) throw new Error(`Unknown feature ${flag}`);
    return (mode === '#' ? cfg.features[flag] : !cfg.features[flag]) ? body : '';
  });
  text = text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Unknown content field ${key}`);
    return escape(values[key]);
  });
  if (text.includes('{{')) throw new Error('Unresolved template instruction');
  return text;
}
// Render first: an invalid configuration cannot erase the previous successful build.
const pages = ['index.html', 'research-facilitation.html', 'meditation.html'];
if (cfg.features.practices) pages.push('practices/new-mothers.html');
const rendered = pages.map(name => [name, render(fs.readFileSync(path.join(root, 'src/pages', name), 'utf8'))]);
const out = path.join(root, 'dist');
fs.rmSync(out, {recursive:true, force:true});
fs.mkdirSync(out, {recursive:true});
for (const [name, html] of rendered) {
 fs.mkdirSync(path.dirname(path.join(out, name)), {recursive:true});
 fs.writeFileSync(path.join(out, name), html);
}
for (const name of ['assets', 'styles.css', 'site.js', '404.html']) fs.cpSync(path.join(root,'src', name),path.join(out,name),{recursive:true});
fs.writeFileSync(path.join(out,'robots.txt'), 'User-agent: *\nAllow: /\n');
console.log(`Built ${rendered.length} pages. Enabled: ${Object.entries(cfg.features).filter(([,v])=>v).map(([k])=>k).join(', ') || 'MVP only'}`);
