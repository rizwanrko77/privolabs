import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serverDir = path.join(__dirname, 'dist', 'server');
const clientDir = path.join(__dirname, 'dist', 'client');

if (fs.existsSync(serverDir)) {
  console.log('Bundling Cloudflare worker...');
  esbuild.buildSync({
    entryPoints: [path.join(serverDir, 'entry.mjs')],
    outfile: path.join(clientDir, '_worker.js'),
    bundle: true,
    format: 'esm',
    platform: 'browser',
    external: ['cloudflare:workers', 'node:*']
  });
  console.log('Successfully prepared Cloudflare _worker.js!');
} else {
  console.error('Build output not found. Please run astro build first.');
}
