import fs from 'fs';
import { isMainThread, workerData } from 'worker_threads';
import { setRefTracing } from '../src/utils.mjs';

export function parseTestArgs() {
  if (!isMainThread) {
    return workerData.config;
  }

  // Note: 0=node, 1=file. Ignore empty args
  const argv = process.argv.slice(2).filter(Boolean);

  const config = {
    cloneLimit: undefined, // How many times can a function be cloned for primitive inlining before it's considered recursion?
    fastTest: false,
    fileVerbatim: false,
    logPasses: false,
    implicitThisIdent: undefined,
    noTrace: undefined, // Force set VERBOSE_TRACING=false regardless of input size? If undefined, defaults to verbose.
    maxPass: undefined,
    onlyNormalized: false,
    onlyOutput: false, // When generating test cases, only add the `## Output` block (for diffing)
    randomizedOrder: false,
    refTest: undefined, // Dump special ref tracking debug output / test formatting, instead of normal test cases?
    refTracing: false, // Print ref tracking trace logs
    riskyRules: true, // Enable risky rules. May not be 100% sound but should be ok in most cases and lead to much better results.
    skipEval: false, // Do not run the eval checks afterwards
    targetFile: undefined,
    threadIndex: 0, // ... and this will be that thread
    threads: 1, // By default, only run one thread (only useful for multiple files)
    trace: undefined, // Force set VERBOSE_TRACING=true regardless of input size? If undefined, defaults to verbose.
    trimDollar: false, // Remove trailing $12 from outputs? Reduces noise when diffing when new vars shuffle the incremental suffix
    unroll: undefined, // Cap of the loop unroll transform. The cap is arbitrary. Higher caps are riskier but sometimes exactly what you want.
    unrollTrue: undefined, // Max number of attempts to unroll infinite loops. The cap is arbitrary. Higher caps may lead to longer processing times without changing anything but sometimes a loop takes that many times to unroll.
    updateSnapshots: false,
    verboseTracing: undefined, // Overridden by general verbose state. If undefined, governed by input size.
    verbose: undefined, // Suppress all output
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
        config.skipEval = true; // The eval stuff is more for tests
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

      case '-t': {
        // Thread count
        config.threads = argv.shift() | 0 || 1;
        break;
      }

      case 'fast': {
        // Skip most of the cases/normalization/expression variations
        config.fastTest = true;
        console.log('WARNING: Skipping many tests in cases/normalization/expression !');
        break;
      }

      case '-fast': {
        // Skip anything but the cases/normalization/expression variations (opposite of using fast)
        config.fastTest = 'only';
        console.log('WARNING: Skipping many tests in cases !');
        break;
      }

      case '--implicit-this': {
        config.implicitThisIdent = argv.shift();
        break;
      }

      case '--randomized': {
        config.randomizedOrder = true;
        break;
      }

      case '--log': {
        config.logPasses = true;
        config.logDir = '';
        config.skipEval = true;
        break;
      }

      case '--logto': {
        config.logPasses = true;
        config.logDir = argv.shift();
        config.skipEval = true;
        break;
      }

      case '--max-pass': {
        config.maxPass = +argv.shift();
        break;
      }

      case '--clone-limit': {
        config.cloneLimit = +argv.shift();
        break;
      }

      case '--trim-dollar': {
        config.trimDollar = true;
        break;
      }

      case '--only-output': {
        config.onlyOutput = true;
        break;
      }

      case '--trace': {
        config.verboseTracing = true;
        break;
      }

      case '--no-trace': {
        config.verboseTracing = false;
        break;
      }

      case '--refTest': {
        config.refTest = false;
        break;
      }

      case '--refTracing': {
        config.refTracing = true;
        break;
      }

      case '--risky': {
        config.riskyRules = true; // default
        break;
      }

      case '--no-risky': {
        config.riskyRules = false;
        break;
      }

      case '--silent': {
        config.verbose = false;
        break;
      }

      case '--skip-eval': {
        config.skipEval = true;
        break;
      }

      case '--unroll': {
        config.unroll = +argv.shift();
        break;
      }

      case '--unrollTrue': {
        config.unrollTrue = +argv.shift();
        break;
      }

      default: {
        throw new Error('Unknown parameter: ' + param);
      }
    }
  }

  if (config.verbose === false) config.verboseTracing = false;

  return config;
}
