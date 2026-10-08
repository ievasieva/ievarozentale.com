import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../dist');
const files=fs.readdirSync(root,{recursive:true}).filter(n=>n.endsWith('.html'));
let checks=0;
for (const file of files) {
 const html=fs.readFileSync(path.join(root,file),'utf8');
 if(/href="#"|link to be added|\{\{/.test(html)) throw new Error(`Unfinished content in ${file}`);
 if((html.match(/<h1\b/g)||[]).length!==1) throw new Error(`Expected one h1 in ${file}`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length) throw new Error(`Duplicate ID in ${file}`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if(/^(https?:|mailto:|data:)/.test(url)) continue;
  const [pathname,hash]=url.split('#');
  const target=pathname.startsWith('/')?path.join(root,pathname):path.resolve(root,path.dirname(file),pathname||path.basename(file));
  if(!fs.existsSync(target)) throw new Error(`Broken local link ${url} in ${file}`);
  if(hash && !fs.readFileSync(target,'utf8').includes(`id="${hash}"`)) throw new Error(`Missing anchor ${url} in ${file}`);
  checks++;
 }
}
for(const privateName of ['src','archive','site.config.json','README.md']) if(fs.existsSync(path.join(root,privateName))) throw new Error(`Private source leaked: ${privateName}`);
console.log(`Checked ${files.length} pages and ${checks} local links/assets. No placeholders or draft source in output.`);
