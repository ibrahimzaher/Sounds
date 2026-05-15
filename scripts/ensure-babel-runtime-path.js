const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'node_modules', '@babel', 'runtime');
const targetDir = path.join(
  rootDir,
  'node_modules',
  '@angular-devkit',
  'build-angular',
  'node_modules',
  '@babel',
  'runtime'
);

if (!fs.existsSync(sourceDir) || fs.existsSync(targetDir)) {
  process.exit(0);
}

fs.mkdirSync(path.dirname(targetDir), { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });