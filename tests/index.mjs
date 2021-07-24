// ran on node 14+ (only real requirement is esm)

import fs from 'fs';
import { preval } from '../src/index.mjs';
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
  toNormalizedResult,
} from './utils.mjs';
import {
  BUILTIN_ARRAY_PROTOTYPE,
  BUILTIN_FUNCTION_PROTOTYPE,
  BUILTIN_NUMBER_PROTOTYPE,
  BUILTIN_OBJECT_PROTOTYPE,
  BUILTIN_STRING_PROTOTYPE,
} from '../src/constants.mjs';
import { coerce } from '../src/utils.mjs';
import { getTestFileNames, PROJECT_ROOT_DIR } from './cases.mjs';
import { parseTestArgs } from './process-env.mjs';
// Note: worker_threads are node 10.15. I'd make them optional if import syntax allowed this, but I'm not gonna taint the whole test suite with async for the sake of it.
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

Error.stackTraceLimit = Infinity;

console.time('Total test time');

const CONFIG = parseTestArgs();
if (isMainThread) {
  console.log(CONFIG);
}

if (isMainThread && CONFIG.threads > 1) {
  // Spin off multiple threads and have them do the work in chunks. This thread will do the reporting.

  console.log('Spinning up', CONFIG.threads, 'threads');
  console.log('import.meta.url:', import.meta.url.replace('file://', ''));

  let retryVerbose = '';
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
          retryVerbose = last;
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
  if (retryVerbose) {
    console.log('A test failed (' + retryVerbose + '). Running it in verbose mode in main thread');
    CONFIG.targetFile = retryVerbose;
  } else {
    console.log('Finished, no test fataled, exiting now...');
    //if (isMainThread) {
    console.log(`Suite finished`);
    console.timeEnd('Total test time');
    //}
    process.exit();
  }
}

const allFileNames = CONFIG.targetFile ? [CONFIG.targetFile] : getTestFileNames(CONFIG.targetDir);
const fastFileNames = allFileNames.filter(
  (fname) =>
    !(
      CONFIG.fastTest &&
      (fname.includes('normalize/expressions/bindings') ||
        fname.includes('normalize/expressions/assignment') ||
        (fname.includes('normalize/expressions/statement') && !fname.includes('normalize/expressions/statement/statement')))
    ),
);
const workerStep = Math.ceil(fastFileNames.length / CONFIG.threads);
const workerOffset = CONFIG.threadIndex * workerStep;
console.log('Slicing test cases from', workerOffset, 'to', workerOffset + workerStep);
const fileNames = fastFileNames.filter((fn, fi) => fi % CONFIG.threads === CONFIG.threadIndex);
const testCases = fileNames
  .map((fname) => ({ fname, md: fs.readFileSync(fname, 'utf8') }))
  .map(({ md, fname }) => fromMarkdownCase(md, fname, CONFIG));

let snap = 0; // snapshot fail
let fail = 0; // crash
let badNorm = 0; // evaluation of normalized code does not match input
let badFinal = 0; // evaluation of final output does not match input
testCases.forEach((tc, i) => runTestCase({ ...tc, withOutput: testCases.length === 1 && !CONFIG.onlyNormalized }, i));

if (isMainThread) {
  console.log(
    `Suite finished, ${GREEN}${testCases.length} tests ${RESET}${snap ? `, ${ORANGE}${snap} snapshot mismatches${RESET}` : ''}${
      fail ? `, ${RED}${fail} tests crashed${RESET}` : ''
    }${badNorm ? `, ${RED}${badNorm} normalized cases changed observable behavior${RESET}` : ''}${
      badFinal ? `, ${RED}${badFinal} tests ended with changed observable behavior${RESET}` : ''
    }`,
  );
  console.timeEnd('Total test time');
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
  }

  let expectedError = false;
  try {
    if (CONFIG.verbose === false && CONFIG.targetFile) console.log('\nNow running Preval without output...\n');
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
            console.log('-', fin[importPath].length, 'bytes');
          }
        }
        if (CONFIG.fileVerbatim && importPath !== 'intro') {
          return '';
        }
        return fin[importPath];
      },
      stopAfterNormalize: !!CONFIG.onlyNormalized,
      options: {
        cloneLimit: CONFIG.cloneLimit ?? mdOptions?.cloneLimit ?? 10,
        logPasses: CONFIG.logPasses,
        logDir: CONFIG.logDir,
        maxPass: CONFIG.maxPass ?? mdOptions?.maxPass,
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

  //hoe kunnen we tests/cases/templates/nested_multi.md weer lijmen?

  const evalled = { $in: [], $pre: [], $norm: [], $out: [] };
  function ev(desc, fdata, stack) {
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
      function $(...a) {
        if (stack.length > (before ? 25 : 10000)) throw new Error('Loop aborted by Preval test runner');

        const tmp = a[0];

        stack.push(
          '[' +
            a
              .map(safeCloneString)
              .join(', ')
              // We normalize to return undefined so empty functions should get that too
              .replace(/\(\) \{\}/g, '() {return undefined;}') +
            ']',
        );

        return tmp;
      }
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
      function $coerce(x, to) {
        return coerce(x, to);
      }
      // Note: prepending strict mode forces the code to be strict mode which is what we want in the first place and it prevents
      //       undefined globals from being generated which prevents cross test pollution leading to inconsistent results
      const returns = new Function(
        '$',
        'objPatternRest',
        '$dotCall',
        '$spy',
        '$coerce',
        BUILTIN_ARRAY_PROTOTYPE,
        BUILTIN_FUNCTION_PROTOTYPE,
        BUILTIN_NUMBER_PROTOTYPE,
        BUILTIN_OBJECT_PROTOTYPE,
        BUILTIN_STRING_PROTOTYPE,
        '"use strict"; ' + fdata.intro,
      )(
        $,
        objPatternRest,
        $dotCall,
        $spy,
        $coerce,
        Array.prototype,
        Function.prototype,
        Number.prototype,
        Object.prototype,
        String.prototype,
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
      const msg = String(e?.message ?? e)
        .replace(/^.*is not a constructor.*$/, '<ref> is not a constructor')
        .replace(/^.*is not iterable.*$/, '<ref> is not iterable')
        .replace(/^.* is not defined.*$/, '<ref> is not defined')
        // Make the error in the real test the same as what we would throw after normalization
        .replace(/^.*Cannot destructure '[^']*?' as it is (undefined|null)./, "Cannot read property 'cannotDestructureThis' of $1")
        .replace(/^.*Cannot destructure property '[^']*?' of '[^']*?' as it is (undefined|null)./, 'Cannot read property <name> of $1')
        .replace(/.*? is not (a function|iterable)/, '<ref> is not function/iterable')
        .replace(/.*Cannot read property 'call' of .*/, '<ref> is not function/iterable') // We transform member calls to .call() so the test should be okay to assume they are the same error
        .replace(/function ?\(\) ?\{/g, 'function() {')
        .replace(/Cannot read property .*? of .*/g, 'Cannot read property <ref> of <ref2>')
        .replace(/(?:Preval: )?Cannot access ['`][\w$]+['`] before initialization/, "Cannot access '<ref>' before initialization")
        .replace(/Preval: Cannot write to const binding .*/, 'Assignment to constant variable.')

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
  evalled.$in = CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalInput ? [SKIPPED] : ev('input', fin, evalled.$in);
  evalled.$pre = CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalPre ? [SKIPPED] : ev('pre normalization', fin, evalled.$pre);
  evalled.$norm =
    CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalNormalized ? [SKIPPED] : ev('normalized', output?.normalized, evalled.$norm);
  if (!CONFIG.onlyNormalized) {
    evalled.$out =
      CONFIG.skipEval || mdOptions.skipEval || mdOptions.skipEvalOutput ? [SKIPPED] : ev('output', output?.files, evalled.$out);
  }

  if (withOutput) {
    console.log('\n');
    console.groupEnd();
  }

  if (!isExpectingAnError && lastError) {
    if (!withOutput && !CONFIG.onlyNormalized) {
      console.log(WHITE_BLACK + 'Test crashed, re-running it with output' + RESET);
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
        console.log('BAD!! Preval did not throw an error but was epxected to:');
        console.log(lastError);
      }
      console.log(toNormalizedResult(output.normalized));
      console.log();
      console.log(toEvaluationResult(evalled, output.implicitGlobals, true));
    }
  } else {
    let md2 = toMarkdownCase({ md, mdHead, mdChunks, fname, fin, output, evalled, lastError, isExpectingAnError }, CONFIG);

    let snapshotChanged = md2 !== md;
    let normalizationDesync = md2.includes('BAD?!');
    let outputDesync = md2.includes('BAD!!');

    if (snapshotChanged) {
      ++snap;

      if (CONFIG.fileVerbatim) {
        console.log('Not writing result');
      } else {
        fs.writeFileSync(fname, md2, 'utf8');
      }
    }

    if (normalizationDesync) ++badNorm;
    else if (outputDesync) ++badFinal;

    if (!CONFIG.fileVerbatim && (snapshotChanged || normalizationDesync || outputDesync)) {
      const data = [
        snapshotChanged ? BOLD + 'Snapshot changed' + RESET : '',
        normalizationDesync ? 'Eval changes for normalization' : '',
        !normalizationDesync && outputDesync ? 'Eval changes for result' : '',
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
