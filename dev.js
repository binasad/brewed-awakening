const { execSync } = require('child_process');
const path = require('path');
process.chdir(__dirname);
require(path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next'));
