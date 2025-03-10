// ran on node 14+ (only real requirement is esm)

import fs from 'fs';
import path from 'path';
import { preval } from '../src/index.mjs';
import * as AST from '../src/ast.mjs';
import {setPrintVarTyping} from '../lib/printer.mjs';
import { RED, GREEN, YELLOW, BLUE, WHITE, BOLD, RESET, WHITE_BLACK, ORANGE, GOOD, BAD, fmat, fromMarkdownCase, toEvaluationResult, toMarkdownCase, toNormalizedResult, ASSERT, } from './utils.mjs';
import { DIM, VERBOSE_TRACING, } from '../src/constants.mjs';
import { SYMBOL_FOROF, SYMBOL_FORIN, SYMBOL_DOTCALL, BUILTIN_REST_HANDLER_NAME, SYMBOL_LOOP_UNROLL, SYMBOL_MAX_LOOP_UNROLL, SYMBOL_THROW_TDZ_ERROR, SYMBOL_PRNG, SYMBOL_COERCE, SYMBOL_FRFR } from '../src/symbols_preval.mjs';
import { BUILTIN_SYMBOLS, sym_prefix, symbo } from '../src/symbols_builtins.mjs';
import { coerce, log, setRefTracing, tmat, vlog } from '../src/utils.mjs';
import { getTestFileNames, PROJECT_ROOT_DIR } from './cases.mjs';
import { parseTestArgs } from './process-env.mjs';
// Note: worker_threads are node 10.15. I'd make them optional if import syntax allowed this, but I'm not gonna taint the whole test suite with async for the sake of it.
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { runPcode } from '../src/pcode.mjs';
import { createBuiltinSymbolGlobals } from './global_symbol_mapper.mjs';

Error.stackTraceLimit = Infinity;

console.time('Total ./p time');

const CONFIG = parseTestArgs();
if (isMainThread) {
  console.log(CONFIG);
}
if (CONFIG.refTracing) setRefTracing(true);

if (isMainThread && CONFIG.threads > 1) {
  // Spin off multiple threads and have them do the work in chunks. This thread will do the reporting.

  console.log('Spinning up', CONFIG.threads, 'threads');
  console.log('import.meta.url:', import.meta.url.replace('file://', ''));

  let fileToRetryVerbose = '';
  const resolvers = [];
  const promises = [];
  const threads = [];
  let broke = false;
  for (let threadIndex = 0; threadIndex < CONFIG.threads; ++threadIndex) {
    promises.push(
      new Promise((resolve, reject) => {
        resolvers.push(resolve);
        const worker = new Worker(import.meta.url.replace('file://', ''), {
          workerData: {
            config: {
              ...CONFIG,
              threadIndex,
            },
          },
        });
        let last = '';
        worker.on('message', (arr) => {
          if (broke) return;
          last = arr[arr.length - 2];
          console.log(...arr);
        });
        worker.on('error', (e) => {
          if (broke) return;
          console.log('Going to kill all threads and run this test case in verbose mode... : ' + last);
          // We can't abort the workers without fataling nodejs. So instead we mute them and tell the main thread
          // that they've completed. This allows the promise.all to continue and run the failed test case in CLI.
          fileToRetryVerbose = last;
          resolvers.forEach((r) => r());
          broke = true;
        });
        worker.on('exit', (code) => {
          if (broke) return;
          if (code === 0 || broke) {
            resolve();
          } else {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
        threads.push(worker);
      }),
    );
  }

  console.log('Waiting for threads to complete...');
  await Promise.all(promises);
  if (fileToRetryVerbose) {
    console.log('Test (' + fileToRetryVerbose + ') crashed. Running it in verbose mode in main thread');
    CONFIG.targetFile = fileToRetryVerbose;
  } else {
    console.log('Finished, no test fataled, exiting now...');
    //if (isMainThread) {
    console.log(`Suite finished`);
    console.timeEnd('Total ./p time');
    //}
    process.exit();
  }
}

const allFileNames = CONFIG.targetFile ? [CONFIG.targetFile] : getTestFileNames(CONFIG.targetDir);
const fastFileNames = allFileNames.filter(
  (fname) => {
    if (!CONFIG.fastTest) return true;
    const isSlowTest = (
      fname.includes('normalize/expressions/bindings') ||
      fname.includes('normalize/expressions/assignment') ||
      (fname.includes('normalize/expressions/statement') && !fname.includes('normalize/expressions/statement/statement')) ||
      fname.includes('tests/cases/normalize/pattern')
    );
    if (CONFIG.fastTest === 'only') return isSlowTest; // _Only_ include the slow tests because "-fast" was passed in
    return !isSlowTest; // Do not include the slow tests because fast is enabled
  }
);
const workerStep = Math.ceil(fastFileNames.length / CONFIG.threads);
const workerOffset = CONFIG.threadIndex * workerStep;
if (isMainThread) {
  console.log('Slicing test cases from', workerOffset, 'to', workerOffset + workerStep);
} else {
  parentPort.postMessage(['Slicing test cases from', workerOffset, 'to', workerOffset + workerStep]);
}
const fileNames = fastFileNames.filter((fn, fi) => fi % CONFIG.threads === CONFIG.threadIndex);

// Bad idea? Use --randomized to process tests in random order. Helps when incrementally trying
// to fix something. All tests will be visited but at some point you will have fixed all the
// earlier ones and a random order helps surface other tests sooner.
if (CONFIG.randomizedOrder) {
  if (isMainThread) {
    console.log('Shuffling tests...');
  } else {
    parentPort.postMessage(['Shuffling tests...']);
  }
  fileNames.sort(Math.random);
}

const testCases = fileNames
  .map((fname) => ({ fname, md: fs.readFileSync(fname, 'utf8') }))
  .map(({ md, fname }) => fromMarkdownCase(md, fname, CONFIG));

let snap = 0; // snapshot fail
let fail = 0; // crash
let badNorm = 0; // evaluation of normalized code does not match input
let badFinal = 0; // evaluation of final output does not match input

try {
  testCases.forEach((tc, i) => runTestCase({ ...tc, withOutput: testCases.length === 1 && !CONFIG.onlyNormalized }, i));
} catch (e) {
  console.log(RED + 'At least one test crashed hard.' + RESET);
  // If you're not seeing a stack trace then it's probably happening in preval. Enable next line:
  console.log(e);
}

if (isMainThread) {
  if (CONFIG.fileVerbatim) {
    if (CONFIG.logPasses || CONFIG.logPhases) {
      console.log('Finished. See output files.');
    } else {
      console.log('Finished');
      console.log('Use `--log` or `--logto` to dump intermediate logs');
    }
  } else {
    console.log(
      `Suite finished, ${GREEN}${testCases.length} tests ${RESET}${snap ? `, ${ORANGE}${snap} snapshot mismatches${RESET}` : ''}${
        fail ? `, ${RED}${fail} tests crashed${RESET}` : ''
      }${badNorm ? `, ${RED}${badNorm} normalized cases changed observable behavior${RESET}` : ''}${
        badFinal ? `, ${RED}${badFinal} tests ended with changed observable behavior${RESET}` : ''
      }`,
    );
  }
  console.timeEnd('Total ./p time');
}

function runTestCase(
  { md, mdHead, mdOptions, mdChunks, fname, sname = fname.slice(PROJECT_ROOT_DIR.length + 1), fin, withOutput = false, ...other },
  relativeCaseIndex,
) {
  const caseIndex = workerOffset + relativeCaseIndex;
  if (JSON.stringify(other) !== '{}') {
    console.log('received these unexpected args:', other);
    test_arg_count;
  }

  const code = '// ' + (caseIndex + 1) + ' / ' + testCases.length + ' : intro\n' + fin.intro; // .intro is the main entry point
  {
    const data = [
      '|###################################################|',
      ' '.repeat(String(fastFileNames.length).length - String(caseIndex + 1).length),
      caseIndex + 1,
      '/',
      fastFileNames.length,
      '(',
      (((caseIndex - workerOffset) / testCases.length) * 100) | 0,
      '%) [',
      sname,
      ']',
    ];
    if (isMainThread) {
      console.log(...data);
    } else {
      parentPort.postMessage(data);
    }
  }

  if (withOutput) {
    console.log('code:');
    console.log(code.length > 1000 ? code.slice(0, 1000) + '...\n<snip>' : code);
    console.log('###################################################', caseIndex + 1, '/', testCases.length, '[', sname, ']');
    console.group();
  }

  let lastError = false;
  let output;
  let isExpectingAnError = mdHead.includes('\n### THROWS');
  if (withOutput) {
    console.log('Test case:', isExpectingAnError ? 'Expecting to throw an error' : 'Not expecting an error');
    console.log('mdOptions:', mdOptions);
  }

  const isRefTest = CONFIG.refTest ?? mdOptions?.refTest;
  const isPcodeTest = CONFIG.pcodeTest ?? mdOptions?.pcodeTest;
  const initialPrngSeed = CONFIG.prngSeed ?? mdOptions?.seed ?? 1;
  const todos = new Set;

  let expectedError = false;
  try {
    if (CONFIG.verbose === false && CONFIG.targetFile) console.log('\nNow running Preval without output...\n');
    else if (withOutput) console.log('\n--- Actual call now ---\n');

    let lastWrite = 0;
    output = preval({
      entryPointFile: 'intro',
      stdio: CONFIG.verbose === true || (CONFIG.verbose === undefined && withOutput) ? undefined : () => {}, // handler receives all console calls, first arg is handler string. cant prevent the overhead but does suppress the output
      verbose: CONFIG.verbose === true || (CONFIG.verbose === undefined && !!withOutput), // do not bother to pretty print between steps and whatever if we're not printing it anyways
      verboseTracing: withOutput && CONFIG.verboseTracing, // Print output but not the nitty gritty (useful for large inputs and -F)
      resolve(filePath) {
        if (withOutput) console.log('Preval test harness; resolve(' + filePath + ') (no change)');
        return filePath;
      },
      req(importPath) {
        if (withOutput) {
          console.log('Preval test harnas; require(' + importPath + ')');
          if (CONFIG.fileVerbatim && importPath !== 'intro') {
            console.log('TODO: currently skipping imports from `./p F` runs');
          } else {
            console.log('-', fin[importPath]?.length, 'bytes');
          }
        }
        if (CONFIG.fileVerbatim && importPath !== 'intro') {
          return '';
        }
        return fin[importPath];
      },
      stopAfterNormalize: !!CONFIG.onlyNormalized,
      options: {
        risky: CONFIG.riskyRules,
        cloneLimit: CONFIG.cloneLimit ?? mdOptions?.cloneLimit ?? 10,
        implicitThisIdent: CONFIG.implicitThisIdent ?? mdOptions?.implicitThis ?? 'undefined',
        logPasses: CONFIG.logPasses,
        logPhases: CONFIG.logPhases,
        logDir: CONFIG.logDir,
        logFrom: CONFIG.logFrom,
        maxPass: CONFIG.maxPass ?? mdOptions?.maxPass,
        refTest: isRefTest,
        pcodeTest: isPcodeTest,
        prngSeed: initialPrngSeed,
        unrollLimit: CONFIG.unrollLimit ?? mdOptions?.unroll ?? 11,
        onAfterFirstParse(preFdata) {
          // No action applied. I dont think we need to do anything here
        },
        onAfterNormalizeOnce(preCode, preFdata, nextFname, queueFileCounter, options) {
          // Not much to see here. This set up scope tracking, renamed labels, and some analysis
          // It then did a first one-time normalization pass to remove anything that we should
          // never see again, like `var`, patterns, param defaults, etc.
          if (options.logPasses) {
            console.log('--log-passes: Logging one-time-normalized state to disk for', nextFname);
            const f = path.join(options.logDir, 'preval.a.f' + queueFileCounter + '.onetime.normalized.log.js');
            console.log('-', f, '(', preCode.length, 'bytes) ->', nextFname);
            fs.writeFileSync(f, '// Normalized output after one pass [' + nextFname + ']\n// Command: ' + process.argv.join(' ') + '\n' + preCode);
          }
        },
        onAfterNormalize(fdata, passes, fi, options) {
          if (options.logPasses) {
            const now = Date.now();
            if (passes >= options.logFrom) {
              const code = tmat(fdata.tenkoOutput.ast, true);
              const f = path.join(options.logDir, 'preval.pass' + String(passes).padStart(4, '0') + '.f' + fi + '.normalized.log.js');
              console.log('--log-passes: Logging normalized output to disk:', f, '(', code.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '');
              fs.writeFileSync(f, `// Normalized output after pass ${passes} [` + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + code);
            } else {
              console.log(`--log-passes: Skipping normalized output because ${passes} < ${options.logFrom}, ${now - lastWrite}ms since last write`);
            }
            lastWrite = now;
          }
        },
        onFirstPassEnd(contents, allFileNames, options) {
          if (options.logPasses) {
            if (options.logFrom === 0) {
              console.log('--log-passes: Logging first normalized state to disk...');
              allFileNames.forEach((fname, i) => {
                const f = path.join(options.logDir, 'preval.b.f' + i + '.firstpass.normalized.log.js');
                console.log('-', f, '(', contents.normalized[fname].length, 'bytes) ->', fname);
                fs.writeFileSync(f, '// Normalized output after one pass [' + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + contents.normalized[fname]);
              });
            } else {
              console.log('- (first pass not written because logFrom!=0) (', contents.normalized[fname].length, 'bytes) ->', fname);
            }
          }
        },
        onPassEnd(outCode, passes, fi, options) {
          if (options.logPasses) {
            const now = Date.now();
            if (passes >= options.logFrom) {
              const fstr = fi ? `f${fi}.` : '';
              const f = path.join(options.logDir, 'preval.pass' + String(passes).padStart(4, '0') + '.' + fstr + 'result.log.js');
              console.log('--log: Logging current result to disk:', f, '(', outCode.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '');
              fs.writeFileSync(f, '// Resulting output after one pass [' + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + outCode);
            } else {
              console.log(`--log: Not writing pass to disk because ${passes} < ${options.logFrom}`, '(', outCode.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '');
            }
            lastWrite = now;
          }
        },
        onFinal(outCode, passes, fi, options) {
          const now = Date.now();
          if (options.logPasses || options.logPasses) {
            // Log the settled final result in a consistent filename
            const fstr = fi ? `f${fi}.` : '';
            // Write regardless of logFrom because most likely we'll want to see this one.
            const f = path.join(options.logDir, `preval.pass.all_settled.${fstr}log.js`);
            console.log('--log: Logging final result after',passes,' passes to disk:', f, '(', outCode.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '');
            fs.writeFileSync(f, '// Resulting output after one pass [' + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + outCode);
          }
          lastWrite = now;
        },
        onError(kind, error, ast, options) {
          if (options.logPasses) {
            const f = path.join(options.logDir, 'preval.error.log.js');
            console.log('--log-passes: Logging error to disk:', f);
            let json;
            try {
              json = JSON.stringify(ast, null, 2);
            } catch (e) {
              json = '// JSON.stringify had an error: ' + e.message;
            }
            fs.writeFileSync(f, '// Error when trying to print: ' + error.message + '\n' + error.stack + '\n\nAST:\n' + json);
          }
        },
        onAfterPhase(phaseIndex, passIndex, phaseLoopIndex, fdata, changed, options, fi) {
          // After each phase (0=normalize, -1=denormalize), generally 1 is not interesting to print since that's just scanning
          // Changed is either falsy, or {action: string (name of plugin), changes: number, next: phase1 | normal}
          const now = Date.now();
          const passString =
            phaseIndex === -1
            ? 'denormal'
            : `pass ${passIndex}, loop ${phaseLoopIndex}, phase ${phaseIndex ? phaseIndex : 'normalize'}`
          if (phaseIndex !== 0) setPrintVarTyping(true, fdata);
          const code = tmat(fdata.tenkoOutput.ast, true);
          if (phaseIndex !== 0) setPrintVarTyping(false);
          if (options.logPhases) {
            const fstr = fi ? `f${fi}.` : '';
            if (passIndex >= options.logFrom) {
              const logFname = phaseIndex === -1
                ? `preval.pass.denormalize.${fstr}log.js`
                : `preval.pass.${passIndex}.loop.${phaseLoopIndex}.phase${phaseIndex}.${fstr}log.js`;
              const f = path.join(options.logDir, logFname);
              console.log(`--log: Logging state of ${passString} to disk:`, f, '(', code.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '', changed ? `Phase ${phaseIndex}/3: changed by ${changed.what}, ${changed.changes}x, into ${changed.next}` : '');
              fs.writeFileSync(f,
                `// Resulting output at ${passString} [${fname}]\n` +
                `// Command: ${process.argv.join(' ')}\n` +
                `// Last phase2/3 plugin result: ${changed ? JSON.stringify(changed) : '(none)'}\n` +
                code
              );
            } else {
              console.log(`--log: Not logging ${passString} (${code.length} bytes) because logFrom is ${options.logFrom}`, lastWrite ? `, ${now - lastWrite}ms since last write` : '', changed ? `Phase ${phaseIndex}/3: changed by ${changed.what}, ${changed.changes}x, into ${changed.next}` : '');
            }
          } else if (!CONFIG.targetDir && !CONFIG.updateSnapshots) {
            console.log(`-- ${passString} (${code.length} bytes)`, lastWrite ? `, ${now - lastWrite}ms since last write` : '', changed ? `Phase ${phaseIndex}/3: changed by ${changed.what}, ${changed.changes}x, into ${changed.next}` : '');
          }
          lastWrite = now;
        },
        onTodo(desc, ...args) {
          todos.add(String(desc).trim());
        }
      },
    });
  } catch (e) {
    if (isExpectingAnError) {
      const throws = mdHead.match(/\n### THROWS( .*)?(?:\n|$)/);
      if (throws) {
        if (e.message.includes(throws[1])) {
          expectedError = true;
          lastError = e;
        } else {
          if (withOutput) console.log('\nOh no! Thrown error message does not include expected error');
          isExpectingAnError = false;
        }
      } else {
        expectedError = true;
        lastError = e;
      }
    }

    if (!expectedError) {
      if (withOutput) ++fail;
      lastError = e;
    }
  }

  function createGlobalPrevalSymbols(stack, $, $spy) {

    function $objPatternRest(obj, withoutTheseProps, propName) {
      // Ugly hack that will work. Rest is a shallow clone.
      if (obj === null || obj === undefined) {
        // This is what would happen at runtime.
        if (propName) {
          const {
            [propName]: {},
          } = obj;
        } else {
          const {} = obj;
        }
      }
      // We have to iterate over the keys because if we do a `clone={...obj}; delete clone[key]`
      // we trigger getters that we may not want to trigger.
      const clone = {};
      for (const key in obj) {
        if (Object.hasOwn(obj, key) && !withoutTheseProps.includes(key)) {
          clone[key] = obj[key];
        }
      }
      return clone;
    }

    function $dotCall(func, obj, prop, ...args) {
      // The input started with a member expression as callee that we separated.
      // This function serves as a syntactic clue telling us that the .call must be the built-in Function#call and
      // not a userland .call method that happens to have the same name. This way we can undo some of this "damage" safely.
      return func.call(obj, ...args);
    }

    // We may need to have this alias the actual funcs... not sure if thats worth it
    function $console_log(...args) { $('called $console_log:', ...args); }
    function $console_warn(...args) { $('called $console_warn:', ...args); }
    function $console_error(...args) { $('called $console_error:', ...args); }
    function $console_dir(...args) { $('called $console_dir:', ...args); }
    function $console_debug(...args) { $('called $console_debug:', ...args); }
    function $console_time(...args) { $('called $console_time:', ...args); }
    function $console_timeEnd(...args) { $('called $console_timeEnd:', ...args); }
    function $console_group(...args) { $('called $console_group:', ...args); }
    function $console_groupEnd(...args) { $('called $console_groupEnd:', ...args); }
    function $console_trace(...args) { $('called $console_trace:', ...args); }
    function $console_traceEnd(...args) { $('called $console_traceEnd:', ...args); }

    function $coerce(x, to) {
      return coerce(x, to);
    }

    function * $forIn(obj) {
      for (const key in obj) {
        yield key;
      }
    }

    function * $forOf(obj) {
      for (const item of obj) {
        yield item;
      }
    }

    function $throwTDZError(desc) {
      throw new Error('Cannot access \'<ref>\' before initialization');
    }

    let rngSeed = initialPrngSeed; // zero means disabled, xorshift only works with non-zero seeds.
    function $prng() {
      // Super simple PRNG which we shove into Math.random for our eval tests
      // We use the same algo for inlining in preval so it ought to lead to the same outcome..? tbd if that holds (:
      // https://pvdz.ee/weblog/456
      ASSERT(!!rngSeed, 'do not call xorshift with zero');
      rngSeed = rngSeed ^ rngSeed << 13;
      rngSeed = rngSeed ^ rngSeed >> 17;
      rngSeed = rngSeed ^ rngSeed << 5;
      // Note: bitwise ops are 32bit in JS so we divide the result by the max 32bit number to get a number [0..1>
      return ((rngSeed >>> 0) % 0b1111111111111111) / 0b1111111111111111;
    }

    function $frfr(func, ...args) {
      return func(...args);
    }

    const frameworkInjectedGlobals = {
      '$': $,
      '$spy': $spy,
      [BUILTIN_REST_HANDLER_NAME]: $objPatternRest,
      [SYMBOL_DOTCALL]: $dotCall,
      [SYMBOL_COERCE]: $coerce,
      [SYMBOL_PRNG]: $prng,
      [SYMBOL_FRFR]: $frfr,
      [SYMBOL_FORIN]: $forIn,
      [SYMBOL_FOROF]: $forOf,
      [SYMBOL_THROW_TDZ_ERROR]: $throwTDZError,
      [SYMBOL_MAX_LOOP_UNROLL]: true, // TODO: this would need to be configurable and then this value is update

      ...createBuiltinSymbolGlobals(),

      [symbo('Math', 'random')]: $prng,
      [symbo('console', 'log')]: $console_log,
      [symbo('console', 'warn')]: $console_warn,
      [symbo('console', 'error')]: $console_error,
      [symbo('console', 'dir')]: $console_dir,
      [symbo('console', 'debug')]: $console_debug,
      [symbo('console', 'time')]: $console_time,
      [symbo('console', 'timeEnd')]: $console_timeEnd,
      [symbo('console', 'group')]: $console_group,
      [symbo('console', 'groupEnd')]: $console_groupEnd,
      [symbo('console', 'trace')]: $console_trace,
      [symbo('console', 'traceEnd')]: $console_traceEnd,
    };

    for (const key of BUILTIN_SYMBOLS.keys()) {
      ASSERT(key in frameworkInjectedGlobals, 'All builtin symbols should be exposed in the test runner. Missing:', key);
    }
    for (const key of Object.keys(frameworkInjectedGlobals)) {
      ASSERT(
        [
          '$', '$spy',
          'Function',
          SYMBOL_DOTCALL, SYMBOL_THROW_TDZ_ERROR, SYMBOL_MAX_LOOP_UNROLL, BUILTIN_REST_HANDLER_NAME,
          SYMBOL_COERCE, SYMBOL_PRNG, SYMBOL_FRFR, SYMBOL_FORIN, SYMBOL_FOROF,
        ].includes(key) ||
        key.startsWith(sym_prefix('console', true)) ||
        BUILTIN_SYMBOLS.has(key
      ), 'All exposed builtin symbols in the test runner should be declared. Missing:', key);
    }

    const max = CONFIG.unrollLimit ?? mdOptions?.unroll ?? 10;
    for (let i=0; i<=max; ++i) {
      // $LOOP_UNROLL_1 $LOOP_UNROLL_2 $LOOP_UNROLL_3 etc. Alias as `true`
      frameworkInjectedGlobals[`${SYMBOL_LOOP_UNROLL}${i}`] = true;
    }
    // $LOOP_DONE_UNROLLING_ALWAYS_TRUE. Alias as `true`
    frameworkInjectedGlobals[SYMBOL_MAX_LOOP_UNROLL] = true; // "signals not to unroll any further, but to treat this as "true" anyways"

    return frameworkInjectedGlobals;
  }
  let leGlobalSymbols = Object.keys(createGlobalPrevalSymbols([], () => {}, () => {}));

  if (withOutput && !lastError && !isRefTest && !isPcodeTest && !CONFIG.skipEval) console.log('Evaluating outcomes now for:', CONFIG.targetFile);

  // Test the input verbatim against pre-normal, normal, and output transforms.
  // Then also test while inverting bools and 0/1 inside $() calls, to try and catch a subset of untested logic branches/loops
  const evalled = { $in: [], $pre: [], $norm: [], $settled: [], $denorm: [], $in_inv: [], $pre_inv: [], $norm_inv: [], $settled_inv: [], $denorm_inv: [] };
  function evaluate_inv(desc, fdata, stack) {
    return evaluate(desc, fdata, stack, true);
  }
  function evaluate(desc, inputCodePerFile, stack, inverse) {
    // `inverse` means $(true) becomes $(false), $(false) becomes $(true), $(1) becomes $(0), and $(0) becomes $(1).
    //           Attempts to catch "the reverse logic" or break otherwise infinite loops for some cases.
    ASSERT(inputCodePerFile, 'this evaluate func should receive an object with serialized code for this particular step being tested, one key for each file, starting at `intro`', inputCodePerFile);
    //console.log(inputCodePerFile)

    try {
      let before = true;

      function safeCloneString(a) {
        if (typeof a === 'number') {
          return String(a);
        }

        if (typeof a === 'string') {
          return (
            JSON.stringify(a.replace(/\n/g, '').replace(/  +/g, ' '))
              // All arrows are transformed to function expressions
              .replace(/\(\) => \{\}/g, 'function() {}')
              // Drop function ids
              .replace(/function(?: [\w$]*)?\(\) ?\{/g, 'function() {')
              // We inject debugger statements into all functions
              .replace(/debugger;/g, '')
          );
        }

        if (a === undefined) {
          return 'undefined';
        }

        if (a === null) {
          return 'null';
        }

        if (a === $) {
          return '"<$>"';
        } else if (a === $spy) {
          return '"<$spy>"';
        }

        if (Array.isArray(a)) {
          return '[' + a.map(safeCloneString).join(', ') + ']';
        }

        if (typeof a === 'function') {
          return '"<function>"';
        }

        if (a && typeof a === 'object') {
          if (a.$preval_isArguments) {
            return '"<Global Arguments>"';
          }

          if (spies.has(a)) {
            return '"<spy[' + a.id + ']>"';
          }

          const clone = {};
          Object.keys(a).forEach((key) => {
            const d = Object.getOwnPropertyDescriptor(a, key);
            if ('value' in d) {
              clone[key.replace(/\n\n/g, '')] = safeCloneString(d.value);
            } else {
              clone[key.replace(/\n\n/g, '')] = '<get/set>';
            }
          });

          return (
            (JSON.stringify(clone) ?? '"' + typeof a + '"')
              // All arrows are transformed to function expressions
              .replace(/\(\) => \{\}/g, 'function() {return undefined;}')
              // Drop function ids
              .replace(/function(?: [\w$]*)?\(\) ?\{/g, 'function() {')
              // We inject debugger statements into all functions
              .replace(/\{\\ndebugger;\\n\}/g, '{}')
          );
        }

        return (
          (JSON.stringify(a) ?? '"' + typeof a + '"')
            // All arrows are transformed to function expressions
            .replace(/\(\) => \{\}/g, 'function() {return undefined;}')
            // Drop function ids
            .replace(/function(?: [\w$]*)?\(\) ?\{/g, 'function() {')
            // We inject debugger statements into all functions
            .replace(/\n?debugger;\n?/g, '')
        );

        //.replace(/function(?: [\w$]*)?\(\) ?\{/g, 'function() {');
      }
      function $(...dollarArgs) {
        if (stack.length > (before ? 25 : 10000)) throw new Error('Loop aborted by Preval test runner (this simply curbs infinite loops in tests)');

        let tmp = dollarArgs[0];
        if (inverse) {
          // Attempt to get the inverse of a test case or to break loops that would otherwise be infinite
          if (tmp === 0) tmp = 1;
          else if (tmp === 1) tmp = 0;
          else if (tmp === false) tmp = true;
          else if (tmp === true) tmp = false;
          else if (tmp === undefined) tmp = true;
          else if (tmp === '') tmp = 'true';
          else if (typeof tmp === 'string') tmp = '';
          dollarArgs[0] = tmp;
        }

        stack.push(
          '[' +
            dollarArgs
              .map(safeCloneString)
              .join(', ')
              // We normalize to return undefined so empty functions should get that too
              .replace(/\(\) \{\}/g, '() {return undefined;}') +
            ']',
        );

        return tmp;
      }
      const spies = new Set();
      function $spy(str, val = str) {
        const id = spies.size + 1;
        const alen = arguments.length;
        $('Creating spy', id, arguments.length, [alen === 0 ? 'spy' : str, alen === 0 ? 12345 : val]);
        const spy = {
          id,
          toString() {
            if (alen) $('$spy[' + id + '].toString()', str);
            else $('$spy[' + id + '].toString()');
            return alen ? str : `spy`;
          },
          valueOf() {
            if (alen) $('$spy[' + id + '].valueOf()', val);
            else $('$spy[' + id + '].valueOf()');
            return alen ? val : 12345;
          },
        };
        spies.add(spy);
        return spy;
      }

      const frameworkInjectedGlobals = createGlobalPrevalSymbols(stack, $, $spy);

      // Note: prepending strict mode forces the code to be strict mode which is what we want in the first place and it prevents
      //       undefined globals from being generated which prevents cross test pollution leading to inconsistent results
      const returns = new Function( // window. eval()
        // Globals to inject
        ...Object.keys(frameworkInjectedGlobals),
        // Test code to execute/eval
        // Patch "global" arguments so we can detect it (it's the arguments of the Function we generate here) because they blow up test case results.
        '"use strict"; arguments.$preval_isArguments = true; '+ (initialPrngSeed ? 'Math.random = '+SYMBOL_PRNG+';' : '') + ' ' + inputCodePerFile.intro,
      )(
        // The values of the injected globals
        ...Object.values(frameworkInjectedGlobals),
      );
      before = false; // Allow printing the trace to trigger getters/setters that call $ because we'll ignore it anyways
      stack.push(
        safeCloneString(returns)
          // We normalize to return undefined so empty functions should get that too
          .replace(/\(\) \{\}/g, '() {return undefined;}'),
      );

      if (withOutput) {
        console.log('\n\nEvaluated $ calls for ' + desc + ':', stack);
      }
    } catch (e) {
      if (VERBOSE_TRACING) console.log('test case err [' + desc + ']:', e);
      const msg = String(e?.message ?? e)
        .replace(/^.*is not a constructor.*$/, '<ref> is not a constructor')
        .replace(/^.*is not iterable.*$/, '<ref> is not iterable')
        .replace(/^.* is not defined.*$/, '<ref> is not defined')
        // Make the error in the real test the same as what we would throw after normalization
        .replace(/^.*Cannot destructure '[^']*?' as it is (undefined|null)./, "Cannot read property 'cannotDestructureThis' of $1")
        .replace(/^.*Cannot destructure property '[^']*?' of '[^']*?' as it is (undefined|null)./, 'Cannot read property <name> of $1')
        .replace(/.*? is not (a function|iterable)/, '<ref> is not function/iterable')
        .replace(/.*Cannot read property 'call' of .*/, '<ref> is not function/iterable') // We transform member calls to .call() so the test should be okay to assume they are the same error
        .replace(/.*Found non-callable @@iterator.*/,  '<ref> is not function/iterable')
        .replace(/.*Preval: Attempting to spread primitive that is not an empty string.*/,  '<ref> is not function/iterable')
        .replace(/Preval: cannot call a locked function \(binding overwritten with non-func\)/, '<ref> is not function/iterable')
        .replace(/function ?\(\) ?\{/g, 'function() {')
        //.replace(/Cannot read propert.*? of .*/g, 'Cannot read property <ref> of <ref2>')
        .replace(/Cannot read propert.*? of .*/g, '<ref> is not function/iterable') // Ultimately, not doing this creates more noise than signal.
        .replace(/(?:Preval: )?Cannot access ['`][\w$]+['`] before initialization/, "Cannot access '<ref>' before initialization")
        .replace(/Preval: This statement contained a read that reached no writes.*/, "Cannot access '<ref>' before initialization")
        .replace(/Preval: TDZ triggered for.*/, "Cannot access '<ref>' before initialization")
        .replace(/Preval: Cannot write to const binding .*/, 'Assignment to constant variable.')
        .replace(/Preval: Attempting to spread primitive that is not an empty string.*/, 'Found non-callable @@iterator')
        .replace(/Spread syntax requires.*/, '<ref> is not function/iterable')
         .replace(/.*max pcode call depth.*/, 'Maximum call stack size exceeded')

        // All arrows are transformed to function expressions
        .replace(/\(\) => \{\}/g, 'function() {}')
        // Drop function ids
        .replace(/function(?: [\w$]*)?\(\) ?\{/g, 'function() {')
        // We inject debugger statements into all functions
        .replace(/\n?debugger;\n?/g, '')
        // We normalize to return undefined so empty functions should get that too
        .replace(/\(\) \{\}/g, '() {return undefined;}');

      stack.push('"<crash[ ' + msg.replace(/"/g, '\\"').replace(/\n/g, '') + ' ]>"');

      if (withOutput) {
        console.log('\n\nEvaluated $ calls for ' + desc + ':', stack.concat(e?.message ?? e));
      }
    }

    // The closure persist so when serializing it might still add elements to the original stack
    // To prevent these changes, we shallow copy and store the current state.
    return stack.slice(0);
  }
  const SKIPPED = '"<skipped by option>"';
  evalled.$in = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalInput || isRefTest || isPcodeTest ? [SKIPPED] : evaluate('input', fin, evalled.$in);
  evalled.$in_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalInput || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('inv input', fin, evalled.$in_inv);
  evalled.$pre = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalPre || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate('pre normalization', fin, evalled.$pre);
  evalled.$pre_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalPre || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('inv pre normalization', fin, evalled.$pre_inv);
  evalled.$norm = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalNormalized || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate('normalized', output?.normalized, evalled.$norm);
  evalled.$norm_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalNormalized || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('inv normalized', output?.normalized, evalled.$norm_inv);
  if (!CONFIG.onlyNormalized) {
    evalled.$settled = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalOutput || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate('settled', output?.files, evalled.$settled);
    evalled.$settled_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalOutput || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('inv settled', output?.files, evalled.$settled_inv);
    evalled.$denorm = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalDenorm || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate('denorm', output?.denormed, evalled.$denorm);
    evalled.$denorm_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalDenorm || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('inv denorm', output?.denormed, evalled.$denorm_inv);
  }

  if (isPcodeTest && !CONFIG.skipEval) {
    evalled.$pcode = [];

    // I want to evaluate the pcode and the actual code somehow

    // For all compiled functions find all calls to that function that carry primitive values
    // Call them and show the result. Also call the function as JS. Compare outputs.
    // Maybe also call them with true, false, zero, one, empty string, and 'preval'?

    !lastError && evalled.$pcode.push(
      Object.keys(output.pcodeData) // fname
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .flatMap((fname) => {
        const list = [];
        output.pcodeData[fname].forEach(({pcode, name: funcName, funcNode}, id) => {
          if (typeof id === 'number') return;

          list.push(`Running function "${funcName}":\n`);
          list.push(
            (``.padEnd(30, ' ')) + ('      pcode'.padEnd(20, ' ')) + ' =>   eval'
          );

          const code = tmat(funcNode, true);

          const pcodeData = output.pcodeData[fname];

          const testArgs = [[], undefined, null, true, false, '', 'preval', 0, 1, [0, 0], [0, 1], [1, 0], [1, 1]];

          const meta = output.globallyUniqueNamingRegistry.get(funcName);
          meta.reads.forEach(read => {
            if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
              if (read.parentNode.arguments.every(anode => AST.isPrimitive(anode))) {
                testArgs.push(read.parentNode.arguments.map(anode => AST.getPrimitiveValue(anode)));
              }
            }
          });

          let rngSeed = initialPrngSeed; // non-zero!
          function $prng() {
            if (!rngSeed) return Math.random(); // Shrug
            // Super simple PRNG which we shove into Math.random for our eval tests
            // We use the same algo for inlining in preval so it ought to lead to the same outcome..? tbd if that holds (:
            // https://pvdz.ee/weblog/456
            ASSERT(!!rngSeed, 'do not call xorshift with zero');
            rngSeed = rngSeed ^ rngSeed << 13;
            rngSeed = rngSeed ^ rngSeed >> 17;
            rngSeed = rngSeed ^ rngSeed << 5;
            // Note: bitwise ops are 32bit in JS so we divide the result by the max 32bit number to get a number [0..1>
            return ((rngSeed >>> 0) % 0b1111111111111111) / 0b1111111111111111;
          }

          const coerceStr = 'function '+SYMBOL_COERCE+'(v,t){if (t==="number") return Number(v); if (t==="string") return String(v); return ""+v; }';

          return testArgs.map(vals => {
            if (VERBOSE_TRACING) console.group('\nTest Running', funcName, '(', JSON.stringify(vals), ')');
            rngSeed = initialPrngSeed;
            const out = runPcode(funcName, Array.isArray(vals) ? vals : [vals], pcodeData, output, $prng, rngSeed);

            const argStr = Array.isArray(vals) ? vals.map(v => JSON.stringify(v)).join(', ') : JSON.stringify(vals);
            const testCode = `const ${funcName} = ${code}; return ${funcName}(${argStr})`;
            const evalCode = `${coerceStr} ; ${testCode}`;
            //console.log('testCode:\n', testCode);
            // Note: (0,eval) is an old trick to do indirect eval, which is slightly safer than direct eval. only slightly.
            let eout;
            const bak = Math.random;
            Math.random = $prng; // Wire up prng for the eval (shares same global scope)
            rngSeed = initialPrngSeed;
            const builtinMapper = createBuiltinSymbolGlobals();
            builtinMapper[symbo('Math', 'random')] = $prng;
            try {
              //console.log('test code:', [evalCode])
              eout = new Function(
                ...Object.keys(builtinMapper),
                evalCode
              )(
                ...Object.values(builtinMapper)
              );
            }
            catch (e) {
              eout = e.message;
              vlog('pcode test runtime error:', e);
            }
            finally {
              Math.random = bak; // Restore built-in
            }

            list.push(
              (` - \`${funcName}(${argStr})\``.padEnd(30, ' ')) +
              (` => \`${JSON.stringify(out)}\``.padEnd(20, ' ')) +
              (` => \`${JSON.stringify(eout)}\``.padEnd(20, ' ')) +
              ((Object.is(out, eout) || (out === '<max pcode call depth exceeded>' && eout === 'Maximum call stack size exceeded')) ? '  Ok' : '  BAD!!')
            );
            if (VERBOSE_TRACING) console.groupEnd();
          });
        });

        return list;
      })
      .filter(Boolean)
      .join('\n')
    );
  }
  else log('-- Skipping pcode eval...');

  if (lastError && !isExpectingAnError) console.log('\n\nPreval crashed hard on test/file, skipped evals:', CONFIG.targetFile);

  if (withOutput) {
    console.log('\n');
    console.groupEnd();
  }

  if (!isExpectingAnError && lastError) {
    if (!withOutput && !CONFIG.onlyNormalized) {
      console.log(WHITE_BLACK + 'Test ' + caseIndex + ' (' + fname + ') crashed, re-running it with output' + RESET);
      return runTestCase(
        {
          md,
          mdHead,
          mdOptions,
          mdChunks,
          fname,
          sname,
          fin,
          withOutput: true,
        },
        caseIndex,
      );
    }

    console.error('Error: ' + lastError.message);

    // Collapse the console.group indent because it was cut-off at an unknown indentation level. We can only reset it to zero now.
    for (let i = 0; i < 20; ++i) console.groupEnd();

    console.log('###################################################', caseIndex + 1, '/', testCases.length, '[', fname, ']');

    console.log(`TEST ${RED}FAIL${RESET} Threw an error`);
    if (
      lastError.message?.includes?.('PREVAL ASSERT:') ||
      lastError.includes?.('PREVAL ASSERT:') ||
      lastError.stack?.includes('PREVAL ASSERT:')
    ) {
      console.log('(stack should be printed above. uncomment me if not)');
    } else {
      console.log(lastError.stack || lastError);
    }
    throw new Error('the test failed...');
  }

  if (CONFIG.onlyNormalized) {
    console.log('Not writing result. Showing normalized results:');
    if (lastError) {
      console.log('Preval threw the expected error:');
      console.log(lastError);
    } else {
      if (isExpectingAnError) {
        console.log('BAD!! Preval did not throw an error but was expected to:');
        console.log(lastError);
      }
      console.log(toNormalizedResult(output.normalized));
      console.log();
      console.log(toEvaluationResult(evalled, output.implicitGlobals, true, mdOptions.globals));
      if (isPcodeTest) {
        console.log(evalled.$pcode.join('\n'));
      }
    }
  } else {
    let md2 = toMarkdownCase(
      {
        md, mdOptions, mdHead, mdChunks, fname, fin, output, evalled, lastError, isExpectingAnError, leGlobalSymbols,
        pcodeData: output.pcodeData,
        todos
      },
      CONFIG
    );

    let snapshotChanged = md2 !== md;
    let normalizationDesync = md2.includes('BAD?!');
    let outputDesync = md2.includes('BAD!!');

    if (snapshotChanged) {
      ++snap;

      if (CONFIG.fileVerbatim || CONFIG.logDir) {
        if (CONFIG.logPasses || CONFIG.logPhases) {
          console.log('Not updating input file with result. See written logs.');
        } else {
          console.log('Not writing result. Dumping now...');
          if (!CONFIG.logPasses && !CONFIG.logPhases) console.log('Use `--log` or `--logto` or --log-passes to dump intermediate logs');
          console.log('-----------------------');
          console.log(md2);
          console.log('-----------------------');
        }
      } else {
        fs.writeFileSync(fname, md2, 'utf8');
      }
    }

    if (normalizationDesync) ++badNorm;
    else if (outputDesync) ++badFinal;

    if (!CONFIG.fileVerbatim && (snapshotChanged || normalizationDesync || outputDesync)) {
      const data = [
        snapshotChanged ? BOLD + (!normalizationDesync && !outputDesync ? GREEN : '') + 'Snapshot changed' + RESET : '',
        normalizationDesync ? (snapshotChanged ? ORANGE : BOLD + RED) + 'Eval changes for normalization' + RESET : '',
        !normalizationDesync && outputDesync ? (snapshotChanged ? ORANGE : BOLD + RED) + 'Eval changes for result' + RESET : '',
        ' --> ',
        fname,
      ];
      if (isMainThread) {
        console.log(...data);
      } else {
        parentPort.postMessage(data);
      }
    }

    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();

    if (withOutput && !CONFIG.fileVerbatim) {
      console.log('################################################### end of test', caseIndex + 1, '/', testCases.length, '[', fname, ']');
      console.log();
      console.log(md2);
      console.log('###################################################', caseIndex + 1, '/', testCases.length, '[', fname, ']');
    }

    //const data = [
    //  '|########################end########################|',
    //  ' '.repeat(String(fastFileNames.length).length - String(caseIndex + 1).length),
    //  caseIndex + 1,
    //  '/',
    //  fastFileNames.length,
    //  '(',
    //  (((caseIndex - workerOffset) / testCases.length) * 100) | 0,
    //  '%) [',
    //  sname,
    //  ']',
    //];
    //if (isMainThread) {
    //  console.log(...data);
    //} else {
    //  parentPort.postMessage(data);
    //}
  }
}
