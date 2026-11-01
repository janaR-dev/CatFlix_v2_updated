const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
http.createServer((req, res) => {
    let u = decodeURIComponent(req.url.split('?')[0]);
    if (u === '/') u = '/index.html';
    const f = path.join(root, u);
    if (!f.startsWith(root)) {
        res.writeHead(403);
        return res.end('forbidden');
    }
    fs.readFile(f, (e, d) => {
        if (e) {
            res.writeHead(404);
            return res.end('nf');
        }
        const ext = path.extname(f);
        const t = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.woff2': 'font/woff2',
            '.ico': 'image/x-icon'
        }[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': t });
        res.end(d);
    });
}).listen(5501, () => console.log('listening 5501'));
