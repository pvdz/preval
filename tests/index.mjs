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
import { getTestFileNames, PROJECT_ROOT_DIR } from './cases.mjs';
import { parseTestArgs } from './process-env.mjs';

Error.stackTraceLimit = Infinity;

const CONFIG = parseTestArgs();

const fileNames = CONFIG.targetFile ? [CONFIG.targetFile] : getTestFileNames(CONFIG.targetDir);
const testCases = fileNames
  .filter(
    (fname) =>
      !(
        CONFIG.fastTest &&
        (fname.includes('normalize/expressions/bindings') ||
          fname.includes('normalize/expressions/assignment') ||
          (fname.includes('normalize/expressions/statement') && !fname.includes('normalize/expressions/statement/statement')))
      ),
  )
  .map((fname) => ({ fname, md: fs.readFileSync(fname, 'utf8') }))
  .map(({ md, fname }) => fromMarkdownCase(md, fname, CONFIG));

console.time('Total test time');
let snap = 0; // snapshot fail
let fail = 0; // crash
let badNorm = 0; // evaluation of normalized code does not match input
let badFinal = 0; // evaluation of final output does not match input
testCases.forEach((tc, i) => runTestCase({ ...tc, withOutput: testCases.length === 1 && !CONFIG.onlyNormalized }, i));

console.log(
  `Suite finished, ${GREEN}${testCases.length} tests ${RESET}${snap ? `, ${ORANGE}${snap} snapshot mismatches${RESET}` : ''}${
    fail ? `, ${RED}${fail} tests crashed${RESET}` : ''
  }${badNorm ? `, ${RED}${badNorm} normalized cases changed observable behavior${RESET}` : ''}${
    badFinal ? `, ${RED}${badFinal} tests ended with changed observable behavior${RESET}` : ''
  }`,
);
console.timeEnd('Total test time');

function runTestCase(
  { md, mdHead, mdChunks, fname, sname = fname.slice(PROJECT_ROOT_DIR.length + 1), fin, withOutput = false, ...other },
  caseIndex,
) {
  if (JSON.stringify(other) !== '{}') {
    console.log('received these unexpected args:', other);
    test_arg_count;
  }

  const code = '// ' + (caseIndex + 1) + ' / ' + testCases.length + ' : intro\n' + fin.intro; // .intro is the main entry point

  console.log('###################################################', caseIndex + 1, '/', testCases.length, '[', sname, ']');

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
    output = preval({
      entryPointFile: 'intro',
      stdio: withOutput ? undefined : () => {}, // handler receives all console calls, first arg is handler string. cant prevent the overhead but does suppress the output
      verbose: withOutput, // do not bother to pretty print between steps and whatever if we're not printing it anyways
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

  const evalled = { $in: [], $norm: [], $out: [] };
  function ev(desc, fdata, stack) {
    if (!fdata) return stack.slice(0);
    try {
      let before = true;
      function safeCloneString(a) {
        if (typeof a === 'number') {
          return String(a);
        }

        if (a === undefined) {
          return 'undefined';
        }

        if (a === null) {
          return 'null';
        }

        if (a === $) {
          return '"<$>"';
        }

        if (Array.isArray(a)) {
          return '[' + a.map(safeCloneString).join(', ') + ']';
        }

        if (a && typeof a === 'object') {
          const clone = {};
          Object.keys(a).forEach((key) => {
            const d = Object.getOwnPropertyDescriptor(a, key);
            if ('value' in d) {
              clone[key] = safeCloneString(d.value);
            } else {
              clone[key] = '<get/set>';
            }
          });
          return (JSON.stringify(clone) ?? '"' + typeof a + '"').replace(/function(?: \w*)?\(\) ?\{/g, 'function() {');
        }

        return (JSON.stringify(a) ?? '"' + typeof a + '"').replace(/function(?: \w*)?\(\) ?\{/g, 'function() {');
      }
      function $(...a) {
        if (stack.length > (before ? 25 : 10000)) throw new Error('Loop aborted by Preval test runner');

        const tmp = a[0];

        stack.push('[' + a.map(safeCloneString).join(', ') + ']');

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
      const returns = new Function('$', 'objPatternRest', fdata.intro)($, objPatternRest);
      before = false; // Allow printing the trace to trigger getters/setters that call $ because we'll ignore it anyways
      stack.push(safeCloneString(returns));

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
        .replace(/Cannot access '\w+' before initialization/, "Cannot access '<ref>' before initialization");
      stack.push('"<crash[ ' + msg.replace(/"/g, '\\"') + ' ]>"');

      if (withOutput) {
        console.log('\n\nEvaluated $ calls for ' + desc + ':', stack.concat(e?.message ?? e));
      }
    }

    // The closure persist so when serializing it might still add elements to the original stack
    // To prevent these changes, we shallow copy and store the current state.
    return stack.slice(0);
  }
  evalled.$in = ev('input', fin, evalled.$in);
  evalled.$norm = ev('normalized', output?.normalized, evalled.$norm);
  if (!CONFIG.onlyNormalized) {
    evalled.$out = ev('output', output?.files, evalled.$out);
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
      console.log(toEvaluationResult(evalled, output.files, output.implicitGlobals, true));
    }
  } else {
    const md2 = toMarkdownCase({ md, mdHead, mdChunks, fname, fin, output, evalled, lastError, isExpectingAnError });
    if (md2 !== md) {
      ++snap;

      if (CONFIG.fileVerbatim) {
        console.log('Not writing result:');
        console.log(md2);
        console.log();
      } else {
        fs.writeFileSync(fname, md2, 'utf8');
      }
    }

    if (md2.includes('BAD?!')) ++badNorm;
    else if (md2.includes('BAD!!')) ++badFinal;

    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();

    if (withOutput) {
      console.log('################################################### end of test', caseIndex + 1, '/', testCases.length, '[', fname, ']');
      console.log();
      console.log(md2);
      console.log('###################################################', caseIndex + 1, '/', testCases.length, '[', fname, ']');
    }
  }
}
