export function parseTestArgs() {
  // Note: 0=node, 1=file. Ignore empty args
  const argv = process.argv.slice(2).filter(Boolean);

  const config = {
    updateSnapshots: false,
    noColor: false,
    targetFile: undefined,
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
        config.targetFile = argv.shift();
      }

      case '-C': {
        // no color. handled elsewhere too
        config.noColor = true;
        break;
      }

      default: {
        throw new Error('Unknown parameter: ' + param);
      }
    }
  }

  return config;
}
