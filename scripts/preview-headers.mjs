import fs from 'node:fs';
fs.writeFileSync(new URL('../dist/_headers', import.meta.url), '/*\n  X-Robots-Tag: noindex, nofollow\n');
console.log('Search indexing disabled for this preview. This is not access protection.');
