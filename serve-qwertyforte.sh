#!/usr/bin/env bash
# ==============================================================================
# QwertyForte Zero-Dependency Local Dev Server (Linux / macOS / POSIX)
# ==============================================================================

PORT=${1:-8080}
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/tools/qwertyforte" && pwd)"

echo "============================================================"
echo "  QWERTYFORTE - Universal Build Matrix & Developer Server   "
echo "============================================================"
echo "[Server] Serving from: $DIR"
echo "[Server] URL: http://localhost:$PORT/"

if command -v python3 >/dev/null 2>&1; then
    cd "$DIR" && python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
    cd "$DIR" && python -m SimpleHTTPServer "$PORT"
elif command -v node >/dev/null 2>&1; then
    node -e "
    const http = require('http');
    const fs = require('fs');
    const path = require('path');
    const root = '$DIR';
    http.createServer((req, res) => {
        let p = path.join(root, req.url === '/' ? 'index.html' : req.url);
        fs.readFile(p, (err, data) => {
            if (err) { res.writeHead(404); res.end('Not Found'); }
            else { res.writeHead(200); res.end(data); }
        });
    }).listen($PORT, () => console.log('Listening on $PORT'));
    "
else
    echo "[Error] Neither Python nor Node was found. Please open tools/qwertyforte/index.html directly in your web browser."
    exit 1
fi
