#!/usr/bin/env node
/**
 * build-all.js
 * Creates a unified deploy/ folder containing:
 * - Root index.html and other top-level html (except those you exclude manually)
 * - Key folders (Admin, Student, Teacher, Games, images, CSS, assets, Bin if needed)
 * - Built Vite Editor under deploy/editor/
 * Excludes: EXAMPLES/ folder entirely.
 */
const { execSync } = require('child_process');
const { rmSync, mkdirSync, cpSync, existsSync, readdirSync, lstatSync } = require('fs');
const { join } = require('path');

const root = process.cwd();
const deployDir = join(root, 'deploy');

function log(msg){ console.log('[build-all]', msg); }

function safeCopy(src, dest) {
  if (!existsSync(src)) { log('skip (missing): ' + src); return; }
  cpSync(src, dest, { recursive: true });
}

// 1. Clean deploy dir
if (existsSync(deployDir)) {
  rmSync(deployDir, { recursive: true, force: true });
}
mkdirSync(deployDir);
log('Created deploy/');

// 2. Copy root html files we want (exclude anything you don't want public manually)
readdirSync(root)
  .filter(f => f.toLowerCase().endsWith('.html'))
  .forEach(f => {
    cpSync(join(root, f), join(deployDir, f));
    log('Copied root HTML: ' + f);
  });

// 3. Folders to include
const includeFolders = [
  'Admin',
  'Student',
  'Teacher',
  'Games',
  'images',
  'CSS',
  'assets',
  'Bin' // remove if not needed
];

includeFolders.forEach(folder => {
  const src = join(root, folder);
  if (existsSync(src)) {
    cpSync(src, join(deployDir, folder), { recursive: true });
    log('Copied folder: ' + folder);
  }
});

// 4. Copy supporting files
['robots.txt', 'DISCLAIMER.md', 'README.md'].forEach(file => {
  if (existsSync(join(root, file))) {
    cpSync(join(root, file), join(deployDir, file));
    log('Copied file: ' + file);
  }
});

// 5. Build Vite editor
const editorDir = join(root, 'Editor');
if (existsSync(editorDir)) {
  log('Installing deps in Editor/ (if already installed this is quick)...');
  execSync('npm install', { cwd: editorDir, stdio: 'inherit' });
  log('Building Editor/...');
  execSync('npm run build', { cwd: editorDir, stdio: 'inherit' });
  const dist = join(editorDir, 'dist');
  if (existsSync(dist)) {
    const editorTarget = join(deployDir, 'editor');
    mkdirSync(editorTarget, { recursive: true });
    cpSync(dist, editorTarget, { recursive: true });
    log('Copied editor build to deploy/editor/');
  } else {
    log('WARNING: Editor/dist not found after build.');
  }
}

// 6. Explicitly ensure EXAMPLES not copied
if (existsSync(join(deployDir, 'EXAMPLES'))) {
  rmSync(join(deployDir, 'EXAMPLES'), { recursive: true, force: true });
  log('Removed EXAMPLES from deploy.');
}

// 7. Optional: list deploy structure summary
function list(dir, prefix='') {
  readdirSync(dir).forEach(name => {
    const p = join(dir, name);
    const rel = p.replace(root+require('path').sep, '');
    if (lstatSync(p).isDirectory()) {
      log('DIR  ' + rel + '/');
      list(p, prefix + '  ');
    } else {
      log('FILE ' + rel);
    }
  });
}
log('Build complete. Deploy folder contents:');
list(deployDir);
