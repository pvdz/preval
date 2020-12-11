// ran on node 14+ (only real requirement is esm)

import path from 'path';
import fs from 'fs';

import { ASSERT } from './utils.mjs';

// node does not expose __dirname under module mode, but we can use import.meta to get it
let filePath = import.meta.url.replace(/^file:\/\//, '');
let dirname = path.dirname(filePath);
ASSERT(dirname.endsWith('/tests'), 'update root detection if this changes');

export const PROJECT_ROOT_DIR = path.resolve(path.join(dirname, '..'));

function getTestFiles(path, file = '', files = [], silent = true, dirsToo = false) {
  let combo = path + file;
  if (fs.statSync(combo).isFile()) {
    if (combo.slice(-3) === '.md' && combo.slice(-'README.md'.length) !== 'README.md') {
      files.push(combo);
    }
  } else {
    fs.readdirSync(combo + '/').forEach((s) => getTestFiles(combo + '/', s, files, silent, dirsToo));
    if (dirsToo) files.push(combo);
  }

  return files;
}

export function getTestFileNames() {
  return getTestFiles(path.join(dirname, 'cases'));
}
