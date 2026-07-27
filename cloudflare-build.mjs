import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serverDir = path.join(__dirname, 'dist', 'server');
const clientDir = path.join(__dirname, 'dist', 'client');

// Wait for Astro build to complete before copying
if (fs.existsSync(serverDir)) {
  console.log('Copying Cloudflare worker files...');
  fs.copyFileSync(
    path.join(serverDir, 'entry.mjs'),
    path.join(clientDir, '_worker.js')
  );
  
  fs.cpSync(
    path.join(serverDir, 'chunks'),
    path.join(clientDir, 'chunks'),
    { recursive: true }
  );
  console.log('Successfully prepared Cloudflare _worker.js!');
} else {
  console.error('Build output not found. Please run astro build first.');
}
