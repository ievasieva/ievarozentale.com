import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname,'../dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.txt':'text/plain'};
http.createServer((req,res)=>{
 let pathname;
 try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
 let file=path.resolve(root,'.'+pathname);
 if(!file.startsWith(root+path.sep) && file!==root) {res.writeHead(403).end();return;}
 if(file===root || pathname.endsWith('/')) file=path.join(file,'index.html');
 let status=200;
 if(!fs.existsSync(file)||!fs.statSync(file).isFile()) {file=path.join(root,'404.html');status=404;}
 res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
 fs.createReadStream(file).pipe(res);
}).listen(4173,'0.0.0.0',()=>console.log('Preview: http://localhost:4173'));
