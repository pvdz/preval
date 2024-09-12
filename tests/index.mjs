// ran on node 14+ (only real requirement is esm)

import fs from 'fs';
import path from 'path';
import { preval } from '../src/index.mjs';
import * as AST from '../src/ast.mjs';
import {
  RED,
  GREEN,
  YELLOW,
  BLUE,
  WHITE,
  BOLD,
  RESET,
  WHITE_BLACK,
  ORANGE,
  GOOD,
  BAD,
  fmat,
  fromMarkdownCase,
  toEvaluationResult,
  toMarkdownCase,
  toNormalizedResult, ASSERT,
} from './utils.mjs';
import {
  VERBOSE_TRACING,
  BUILTIN_FOR_OF_CALL_NAME,
  BUILTIN_FOR_IN_CALL_NAME,
  BUILTIN_FUNC_CALL_NAME,
  BUILTIN_REST_HANDLER_NAME,
} from '../src/constants.mjs';
import {
  BUILTIN_ARRAY_PROTOTYPE,
  BUILTIN_FUNCTION_PROTOTYPE,
  BUILTIN_NUMBER_PROTOTYPE,
  BUILTIN_OBJECT_PROTOTYPE,
  BUILTIN_REGEXP_PROTOTYPE,
  BUILTIN_STRING_PROTOTYPE,
  BUILTIN_STRING_METHOD_LOOKUP,
  BUILTIN_ARRAY_METHOD_LOOKUP,
  BUILTIN_STRING_METHODS_SUPPORTED,
  BUILTIN_ARRAY_METHODS_SUPPORTED,
  BUILTIN_FUNCTION_METHODS_SUPPORTED,
  BUILTIN_FUNCTION_METHOD_LOOKUP,
  BUILTIN_REGEXP_METHODS_SUPPORTED,
  BUILTIN_NUMBER_METHODS_SUPPORTED,
  BUILTIN_REGEXP_METHOD_LOOKUP,
  BUILTIN_NUMBER_METHOD_LOOKUP,
  BUILTIN_BOOLEAN_PROTOTYPE,
  BUILTIN_BOOLEAN_METHODS_SUPPORTED,
  BUILTIN_BOOLEAN_METHOD_LOOKUP,
  BUILTIN_DATE_PROTOTYPE,
} from '../src/symbols_builtins.mjs';
import { coerce, log, setRefTracing, tmat, vlog } from '../src/utils.mjs';
import { getTestFileNames, PROJECT_ROOT_DIR } from './cases.mjs';
import { parseTestArgs } from './process-env.mjs';
// Note: worker_threads are node 10.15. I'd make them optional if import syntax allowed this, but I'm not gonna taint the whole test suite with async for the sake of it.
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { runPcode, serializePcode } from '../src/pcode.mjs';

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

testCases.forEach((tc, i) => runTestCase({ ...tc, withOutput: testCases.length === 1 && !CONFIG.onlyNormalized }, i));

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
      '###################################################',
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
            const code = tmat(fdata.tenkoOutput.ast, true);
            const f = path.join(options.logDir, 'preval.pass' + String(passes).padStart(4, '0') + '.f' + fi + '.normalized.log.js');
            const now = Date.now();
            console.log('--log-passes: Logging normalized output to disk:', f, '(', code.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '');
            lastWrite = now;
            fs.writeFileSync(f, `// Normalized output after pass ${passes} [` + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + code);
          }
        },
        onFirstPassEnd(contents, allFileNames, options) {
          if (options.logPasses) {
            console.log('--log-passes: Logging first normalized state to disk...');
            allFileNames.forEach((fname, i) => {
              const f = path.join(options.logDir, 'preval.b.f' + i + '.firstpass.normalized.log.js');
              console.log('-', f, '(', contents.normalized[fname].length, 'bytes) ->', fname);
              fs.writeFileSync(f, '// Normalized output after one pass [' + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + contents.normalized[fname]);
            });
          }
        },
        onPassEnd(outCode, passes, fi, options) {
          if (options.logPasses) {
            const f = path.join(options.logDir, 'preval.pass' + String(passes).padStart(4, '0') + '.f' + fi + '.result.log.js');
            const now = Date.now();
            console.log('--log-passes: Logging current result to disk:', f, '(', outCode.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '');
            lastWrite = now;
            fs.writeFileSync(f, '// Resulting output after one pass [' + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + outCode);
          }
        },
        onFinal(outCode, passes, fi, options) {
          if (options.logPasses) {
            const f = path.join(options.logDir, 'preval.pass' + String(passes).padStart(4, '0') + '.f' + fi + '.result.final.log.js');
            const now = Date.now();
            console.log('--log-passes: Logging final result after',passes,' passes to disk:', f, '(', outCode.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '');
            lastWrite = now;
            fs.writeFileSync(f, '// Resulting output after one pass [' + fname + ']\n// Command: ' + process.argv.join(' ') + '\n' + outCode);
          }
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
        onAfterPhase(phaseIndex, passIndex, phaseLoopIndex, fdata, changed, options) {
          // After each phase (0=normalize), generally 1 is not interesting to print since that's just scanning
          // Changed is either falsy, or {action: string (name of plugin), changes: number, next: phase1 | normal}
          if (options.logPhases) {
            const f = path.join(options.logDir, `preval.pass.${passIndex}.loop.${phaseLoopIndex}.phase${phaseIndex}.log.js`);
            const code = tmat(fdata.tenkoOutput.ast, true);
            const now = Date.now();
            console.log(`--log: Logging state of pass ${passIndex}, loop ${phaseLoopIndex}, ${phaseIndex ? `phase ${phaseIndex}` : 'normal '} to disk:`, f, '(', code.length, 'bytes)', lastWrite ? `, ${now - lastWrite}ms since last write` : '', changed ? `Phase 2/3: changed by ${changed.what}` : '');
            lastWrite = now;
            fs.writeFileSync(f,
              `// Resulting output at pass ${passIndex}, loop ${phaseLoopIndex}, phase ${phaseIndex} [${fname}]\n` +
              `// Command: ${process.argv.join(' ')}\n` +
              `// Last phase2/3 plugin result: ${changed ? JSON.stringify(changed) : '(none)'}\n` +
              code
            );
          }
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

    function objPatternRest(obj, withoutTheseProps, propName) {
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
      const clone = { ...obj };
      withoutTheseProps.forEach((name) => delete clone[name]); // delete is huge deopt so this needs to be handled differently for a prod release.
      return clone;
    }

    function $dotCall(func, obj, ...args) {
      // The input started with a member expression as callee that we separated.
      // This function serves as a syntactic clue telling us that the .call must be the built-in Function#call and
      // not a userland .call method that happens to have the same name. This way we can undo some of this "damage" safely.
      return func.call(obj, ...args);
    }

    // We may need to have this alias the actual funcs... not sure if thats worth it
    function $console_log(...args) { $('called console.log:', ...args); }
    function $console_warn(...args) { $('called console.warn:', ...args); }
    function $console_error(...args) { $('called console.error:', ...args); }
    function $console_dir(...args) { $('called console.dir:', ...args); }
    function $console_debug(...args) { $('called console.debug:', ...args); }
    function $console_time(...args) { $('called console.time:', ...args); }
    function $console_timeEnd(...args) { $('called console.timeEnd:', ...args); }
    function $console_group(...args) { $('called console.group:', ...args); }
    function $console_groupEnd(...args) { $('called console.groupEnd:', ...args); }

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

    const frameworkInjectedGlobals = {
      '$': $,
      [BUILTIN_REST_HANDLER_NAME]: objPatternRest,
      [BUILTIN_FUNC_CALL_NAME]: $dotCall,
      '$console_log': $console_log,
      '$console_warn': $console_warn,
      '$console_error': $console_error,
      '$console_dir': $console_dir,
      '$console_debug': $console_debug,
      '$console_time': $console_time,
      '$console_timeEnd': $console_timeEnd,
      '$console_group': $console_group,
      '$console_groupEnd': $console_groupEnd,
      '$spy': $spy,
      '$coerce': $coerce,
      '$prng': $prng,

      $Array_isArray: Array.isArray,
      $Array_from: Array.from,
      $Array_of: Array.of,
      [BUILTIN_ARRAY_PROTOTYPE]: Array.prototype,
      $array_concat: Array.prototype.concat,
      $array_copyWithin: Array.prototype.copyWithin,
      $array_entries: Array.prototype.entries,
      $array_every: Array.prototype.every,
      $array_fill: Array.prototype.fill,
      $array_filter: Array.prototype.filter,
      $array_find: Array.prototype.find,
      $array_findIndex: Array.prototype.findIndex,
      $array_flat: Array.prototype.flat,
      $array_forEach: Array.prototype.forEach,
      $array_includes: Array.prototype.includes,
      $array_indexOf: Array.prototype.indexOf,
      $array_join: Array.prototype.join,
      $array_keys: Array.prototype.keys,
      $array_lastIndexOf: Array.prototype.lastIndexOf,
      $array_map: Array.prototype.map,
      $array_pop: Array.prototype.pop,
      $array_push: Array.prototype.push,
      $array_reduce: Array.prototype.reduce,
      $array_reduceRight: Array.prototype.reduceRight,
      $array_reverse: Array.prototype.reverse,
      $array_shift: Array.prototype.shift,
      $array_slice: Array.prototype.slice,
      $array_splice: Array.prototype.splice,
      $array_sort: Array.prototype.sort,
      $array_toLocaleString: Array.prototype.toLocaleString,
      $array_toString: Array.prototype.toString,
      $array_unshift: Array.prototype.unshift,
      $array_values: Array.prototype.values,

      [BUILTIN_BOOLEAN_PROTOTYPE]: Boolean.prototype,
      $Boolean_toString: Boolean.prototype.toString,

      [BUILTIN_FUNCTION_PROTOTYPE]: Function.prototype,
      $function_apply: Function.prototype.apply,
      $function_call: Function.prototype.call,
      $function_bind: Function.prototype.bind,
      $function_toString: Function.prototype.toString,

      $Number_EPSILON: Number.EPSILON,
      $Number_MAX_VALUE: Number.MAX_VALUE,
      $Number_MIN_VALUE: Number.MIN_VALUE,
      $Number_NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY,
      $Number_POSITIVE_INFINITY: Number.POSITIVE_INFINITY,
      $Number_isFinite: Number.isFinite,
      $Number_isInteger: Number.isInteger,
      $Number_isNaN: Number.isNaN,
      $Number_isSafeInteger: Number.isSafeInteger,
      $Number_parseFloat: Number.parseFloat,
      $Number_parseInt: Number.parseInt,
      [BUILTIN_NUMBER_PROTOTYPE]: Number.prototype,
      $number_toExponential: Number.prototype.toExponential,
      $number_toFixed: Number.prototype.toFixed,
      $number_toLocaleString: Number.prototype.toLocaleString,
      $number_toPrecision: Number.prototype.toPrecision,
      $number_toString: Number.prototype.toString,
      $number_valueOf: Number.prototype.valueOf,

      $Object_assign: Object.assign,
      $Object_create: Object.create,
      $Object_defineProperty: Object.defineProperty,
      $Object_defineProperties: Object.defineProperties,
      $Object_entries: Object.entries,
      $Object_freeze: Object.freeze,
      $Object_fromEntries: Object.fromEntries,
      $Object_getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor,
      $Object_getOwnPropertyDescriptors: Object.getOwnPropertyDescriptors,
      $Object_getOwnPropertyNames: Object.getOwnPropertyNames,
      $Object_getPrototypeOf: Object.getPrototypeOf,
      $Object_is: Object.is,
      $Object_isExtensible: Object.isExtensible,
      $Object_isFrozen: Object.isFrozen,
      $Object_isSealed: Object.isSealed,
      $Object_keys: Object.keys,
      $Object_preventExtensions: Object.preventExtensions,
      $Object_seal: Object.seal,
      $Object_setPrototypeOf: Object.setPrototypeOf,
      [BUILTIN_OBJECT_PROTOTYPE]: Object.prototype,
      $object_hasOwnProperty: Object.prototype.hasOwnProperty,
      $object_isPrototypeOf: Object.prototype.isPrototypeOf,
      $object_propertyIsEnumerable: Object.prototype.propertyIsEnumerable,
      $object_toLocaleString: Object.prototype.toLocaleString,
      $object_toString: Object.prototype.toString,
      $object_valueOf: Object.prototype.valueOf,

      [BUILTIN_REGEXP_PROTOTYPE]: RegExp.prototype,
      $regexp_exec: RegExp.prototype.exec,
      $regexp_match: RegExp.prototype.match,
      $regexp_matchAll: RegExp.prototype.matchAll,
      $regexp_replace: RegExp.prototype.replace,
      $regexp_replaceAll: RegExp.prototype.replaceAll,
      $regexp_search: RegExp.prototype.search,
      $regexp_split: RegExp.prototype.split,
      $regexp_test: RegExp.prototype.test,

      $String_fromCharCode: String.fromCharCode,
      $String_fromCodePoint: String.fromCodePoint,
      $String_raw: String.raw,
      [BUILTIN_STRING_PROTOTYPE]: String.prototype,
      $string_charAt: String.prototype.charAt,
      $string_charCodeAt: String.prototype.charCodeAt,
      $string_concat: String.prototype.concat,
      $string_includes: String.prototype.includes,
      $string_indexOf: String.prototype.indexOf,
      $string_lastIndexOf: String.prototype.lastIndexOf,
      $string_match: String.prototype.match,
      $string_replace: String.prototype.replace,
      $string_slice: String.prototype.slice,
      $string_split: String.prototype.split,
      $string_substring: String.prototype.substring,
      $string_substr: String.prototype.substr,
      $string_toString: String.prototype.toString,
      $string_toLowerCase: String.prototype.toLowerCase,
      $string_toUpperCase: String.prototype.toUpperCase,

      $Date_now: Date.now,
      $Date_parse: Date.parse,
      $Date_UTC: Date.UTC,
      [BUILTIN_DATE_PROTOTYPE]: Date.prototype,
      $date_getDate: Date.prototype.getDate,
      $date_getDay: Date.prototype.getDay,
      $date_getFullYear: Date.prototype.getFullYear,
      $date_getHours: Date.prototype.getHours,
      $date_getMilliseconds: Date.prototype.getMilliseconds,
      $date_getMinutes: Date.prototype.getMinutes,
      $date_getMonth: Date.prototype.getMonth,
      $date_getSeconds: Date.prototype.getSeconds,
      $date_getTime: Date.prototype.getTime,
      $date_getUTCDate: Date.prototype.getUTCDate,
      $date_getUTCDay: Date.prototype.getUTCDay,
      $date_getUTCFullYear: Date.prototype.getUTCFullYear,
      $date_getUTCHours: Date.prototype.getUTCHours,
      $date_getUTCMilliseconds: Date.prototype.getUTCMilliseconds,
      $date_getUTCMinutes: Date.prototype.getUTCMinutes,
      $date_getUTCSeconds: Date.prototype.getUTCSeconds,
      $date_setDate: Date.prototype.setDate,
      $date_setFullYear: Date.prototype.setFullYear,
      $date_setHours: Date.prototype.setHours,
      $date_setMilliseconds: Date.prototype.setMilliseconds,
      $date_setMinutes: Date.prototype.setMinutes,
      $date_setMonth: Date.prototype.setMonth,
      $date_setSeconds: Date.prototype.setSeconds,
      $date_setTime: Date.prototype.setTime,
      $date_toDateString: Date.prototype.toDateString,
      $date_toISOString: Date.prototype.toISOString,
      $date_toJSON: Date.prototype.toJSON,
      $date_toLocaleDateString: Date.prototype.toLocaleDateString,
      $date_toLocaleString: Date.prototype.toLocaleString,
      $date_toLocaleTimeString: Date.prototype.toLocaleTimeString,
      $date_toString: Date.prototype.toString,
      $date_toTimeString: Date.prototype.toTimeString,
      $date_valueOf: Date.prototype.valueOf,

      $Math_abs: Math.abs,
      $Math_acos: Math.acos,
      $Math_acosh: Math.acosh,
      $Math_asin: Math.asin,
      $Math_asinh: Math.asinh,
      $Math_atan: Math.atan,
      $Math_atan2: Math.atan2,
      $Math_atanh: Math.atanh,
      $Math_cbrt: Math.cbrt,
      $Math_ceil: Math.ceil,
      $Math_clz32: Math.clz32,
      $Math_cos: Math.cos,
      $Math_cosh: Math.cosh,
      $Math_exp: Math.exp,
      $Math_expm1: Math.expm1,
      $Math_floor: Math.floor,
      $Math_fround: Math.fround,
      $Math_hypot: Math.hypot,
      $Math_imul: Math.imul,
      $Math_log: Math.log,
      $Math_log10: Math.log10,
      $Math_log1p: Math.log1p,
      $Math_log2: Math.log2,
      $Math_max: Math.max,
      $Math_min: Math.min,
      $Math_pow: Math.pow,
      $Math_random: Math.random,
      $Math_round: Math.round,
      $Math_sign: Math.sign,
      $Math_sin: Math.sin,
      $Math_sinh: Math.sinh,
      $Math_sqrt: Math.sqrt,
      $Math_tan: Math.tan,
      $Math_tanh: Math.tanh,
      $Math_trunc: Math.trunc,
      $Math_E: Math.E,
      $Math_LN10: Math.LN10,
      $Math_LN2: Math.LN2,
      $Math_LOG10E: Math.LOG10E,
      $Math_LOG2E: Math.LOG2E,
      $Math_PI: Math.PI,
      $Math_SQRT1_2: Math.SQRT1_2,
      $Math_SQRT2: Math.SQRT2,

      $JSON_parse: JSON.parse,
      $JSON_stringify: JSON.stringify,

      [BUILTIN_FOR_IN_CALL_NAME]: $forIn,
      [BUILTIN_FOR_OF_CALL_NAME]: $forOf,
      '$throwTDZError': $throwTDZError,
      '$LOOP_DONE_UNROLLING_ALWAYS_TRUE': true, // TODO: this would need to be configurable and then this value is update
      [BUILTIN_ARRAY_PROTOTYPE]: Array.prototype,
      ...BUILTIN_ARRAY_METHODS_SUPPORTED.reduce((obj, key) => (obj[BUILTIN_ARRAY_METHOD_LOOKUP[key]] = Array.prototype[key], obj), {}),
      [BUILTIN_FUNCTION_PROTOTYPE]: Function.prototype,
      ...BUILTIN_FUNCTION_METHODS_SUPPORTED.reduce((obj, key) => (obj[BUILTIN_FUNCTION_METHOD_LOOKUP[key]] = Function.prototype[key], obj), {}),
      [BUILTIN_NUMBER_PROTOTYPE]: Number.prototype,
      ...BUILTIN_NUMBER_METHODS_SUPPORTED.reduce((obj, key) => (obj[BUILTIN_NUMBER_METHOD_LOOKUP[key]] = Number.prototype[key], obj), {}),
      [BUILTIN_OBJECT_PROTOTYPE]: Object.prototype,
      [BUILTIN_REGEXP_PROTOTYPE]: RegExp.prototype,
      ...BUILTIN_REGEXP_METHODS_SUPPORTED.reduce((obj, key) => (obj[BUILTIN_REGEXP_METHOD_LOOKUP[key]] = RegExp.prototype[key], obj), {}),
      [BUILTIN_STRING_PROTOTYPE]: String.prototype,
      ...BUILTIN_STRING_METHODS_SUPPORTED.reduce((obj, key) => (obj[BUILTIN_STRING_METHOD_LOOKUP[key]] = String.prototype[key], obj), {}),
      [BUILTIN_BOOLEAN_PROTOTYPE]: Boolean.prototype,
      ...BUILTIN_BOOLEAN_METHODS_SUPPORTED.reduce((obj, key) => (obj[BUILTIN_BOOLEAN_METHOD_LOOKUP[key]] = String.prototype[key], obj), {}),
    };

    const max = CONFIG.unrollLimit ?? mdOptions?.unroll ?? 10;
    for (let i=0; i<=max; ++i) {
      // $LOOP_UNROLL_1 $LOOP_UNROLL_2 $LOOP_UNROLL_3 etc. Alias as `true`
      frameworkInjectedGlobals[`$LOOP_UNROLL_${i}`] = true;
    }
    // $LOOP_DONE_UNROLLING_ALWAYS_TRUE. Alias as `true`
    frameworkInjectedGlobals[`$LOOP_DONE_UNROLLING_ALWAYS_TRUE`] = true; // "signals not to unroll any further, but to treat this as "true" anyways"

    return frameworkInjectedGlobals;
  }
  let leGlobalSymbols = Object.keys(createGlobalPrevalSymbols([], () => {}, () => {}));

  if (withOutput && !lastError && !isRefTest && !isPcodeTest) console.log('Evaluating outcomes now for:', CONFIG.targetFile);

  // Test the input verbatim against pre-normal, normal, and output transforms.
  // Then also test while inverting bools and 0/1 inside $() calls, to try and catch a subset of untested logic branches/loops
  const evalled = { $in: [], $pre: [], $norm: [], $out: [], $in_inv: [], $pre_inv: [], $norm_inv: [], $out_inv: [] };
  function evaluate_inv(desc, fdata, stack) {
    return evaluate(desc, fdata, stack, true);
  }
  function evaluate(desc, fdata, stack, inverse) {
    // `inverse` means $(true) becomes $(false), $(false) becomes $(true), $(1) becomes $(0), and $(0) becomes $(1).
    //           Attempts to catch "the reverse logic" or break otherwise infinite loops for some cases.
    if (!fdata) return stack.slice(0);

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
        '"use strict"; arguments.$preval_isArguments = true; '+ (initialPrngSeed ? 'Math.random = $prng;' : '') + ' ' + fdata.intro,
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
      if (VERBOSE_TRACING) console.log('test case err:', e);
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
        .replace(/Cannot read propert.*? of .*/g, 'Cannot read property <ref> of <ref2>')
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
  evalled.$in_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalInput || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('input', fin, evalled.$in_inv);
  evalled.$pre = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalPre || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate('pre normalization', fin, evalled.$pre);
  evalled.$pre_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalPre || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('pre normalization', fin, evalled.$pre_inv);
  evalled.$norm = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalNormalized || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate('normalized', output?.normalized, evalled.$norm);
  evalled.$norm_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalNormalized || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('normalized', output?.normalized, evalled.$norm_inv);
  if (!CONFIG.onlyNormalized) {
    evalled.$out = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalOutput || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate('output', output?.files, evalled.$out);
    evalled.$out_inv = lastError || CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalOutput || isRefTest || isPcodeTest  ? [SKIPPED] : evaluate_inv('output', output?.files, evalled.$out_inv);
  }

  if (isPcodeTest && !CONFIG.fileVerbatim) {
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

          const coerceStr = 'function $coerce(v,t){if (t==="number") return Number(v); if (t==="string") return String(v); return ""+v; }';

          return testArgs.map(vals => {
            if (VERBOSE_TRACING) console.group('\nTest Running', funcName, '(', JSON.stringify(vals), ')');
            rngSeed = initialPrngSeed;
            const out = runPcode(funcName, Array.isArray(vals) ? vals : [vals], pcodeData, output, $prng, rngSeed);

            const argStr = Array.isArray(vals) ? vals.map(v => JSON.stringify(v)).join(', ') : JSON.stringify(vals);
            const testCode = `const ${funcName} = ${code}; ${funcName}(${argStr})`;
            const evalCode = `${coerceStr} ${testCode}`;
            //console.log('testCode:\n', testCode);
            // Note: (0,eval) is an old trick to do indirect eval, which is slightly safer than direct eval. only slightly.
            let eout;
            const bak = Math.random;
            Math.random = $prng; // Wire up prng for the eval (shares same global scope)
            rngSeed = initialPrngSeed;
            try { eout = (0, eval)(evalCode); } catch (e) { eout = e.message; }
            Math.random = bak; // Restore built-in

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
    console.log('(stack should be printed above. uncomment me if not)');
    console.log(lastError.stack || lastError);
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
      console.log(toEvaluationResult(evalled, output.implicitGlobals, true));
      if (isPcodeTest) {
        console.log(evalled.$pcode.join('\n'));
      }
    }
  } else {
    let md2 = toMarkdownCase(
      {
        md, mdOptions, mdHead, mdChunks, fname, fin, output, evalled, lastError, isExpectingAnError, leGlobalSymbols,
        pcodeData: output.pcodeData
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
  }
}
