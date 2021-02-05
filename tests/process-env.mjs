import fs from 'fs';
export function parseTestArgs() {
  // Note: 0=node, 1=file. Ignore empty args
  const argv = process.argv.slice(2).filter(Boolean);

  const config = {
    updateSnapshots: false,
    noColor: false,
    targetFile: undefined,
    fileVerbatim: false,
    fastTest: false,
  };

  while (argv.length) {
    const param = argv.shift();
    switch (param) {
      case '-u':
      case '--update-snapshots': {
        config.updateSnapshots = true;
        break;
      }

      case '-f': {
        const name = argv.shift();
        if (fs.statSync(name).isDirectory()) {
          config.targetDir = name[name.length - 1] === '/' ? name.slice(0, -1) : name;
        } else {
          config.targetFile = name;
        }

        break;
      }

      case '-F': {
        config.targetFile = argv.shift();
        config.fileVerbatim = true;
        break;
      }

      case '-C': {
        // no color. handled elsewhere too
        config.noColor = true;
        break;
      }

      case '-n': {
        // Only output the normalized code
        config.onlyNormalized = true;
        break;
      }

      case 'fast': {
        // Skip most of the cases/normalization/expression variations
        config.fastTest = true;
        console.log('WARNING: Skipping many tests in cases/normalization/expression !');
        break;
      }

      default: {
        throw new Error('Unknown parameter: ' + param);
      }
    }
  }

  return config;
}
