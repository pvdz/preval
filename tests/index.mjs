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
  fromMarkdownCase,
  toMarkdownCase,
  fmat,
} from './utils.mjs';
import { getTestFileNames, PROJECT_ROOT_DIR } from './cases.mjs';
import { parseTestArgs } from './process-env.mjs';

Error.stackTraceLimit = Infinity;

const CONFIG = parseTestArgs();

const fileNames = CONFIG.targetFile ? [CONFIG.targetFile] : getTestFileNames(CONFIG.targetDir);
const testCases = fileNames
  .map((fname) => ({ fname, md: fs.readFileSync(fname, 'utf8') }))
  .map(({ md, fname }) => fromMarkdownCase(md, fname, CONFIG));

let pass = 0;
let snap = 0; // snapshot fail
let fail = 0; // crash
testCases.forEach((tc, i) => runTestCase({ ...tc, withOutput: testCases.length === 1 }, i));

console.log(
  `Suite finished, ${GREEN}${pass} tests passed${RESET}${snap ? `, ${ORANGE}${snap} snapshot mismatches${RESET}` : ''}${
    fail ? `, ${RED}${fail} tests crashed${RESET}` : ''
  }`,
);

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
    console.log(code);
    console.log('###################################################', caseIndex + 1, '/', testCases.length, '[', sname, ']');
    console.group();
  }

  let lastError = false;
  let output;
  try {
    output = preval({
      entryPointFile: 'intro',
      stdio: withOutput ? undefined : () => {}, // handler receives all console calls, first arg is handler string. cant prevent the overhead but does suppress the output
      resolve(filePath) {
        return filePath;
      },
      req(importPath) {
        return fin[importPath];
      },
    });
  } catch (e) {
    if (withOutput) ++fail;
    lastError = e;
  }

  const evalled = { $in: [], $norm: [], $out: [] };
  function ev(desc, fdata, stack) {
    try {
      let before = true;
      function $(...a) {
        if (stack.length > (before ? 100 : 10000)) throw new Error('Loop aborted by Preval test runner');
        stack.push(a);
      }
      const returns = new Function('$', fdata.intro)($);
      before = false; // Allow printing the trace to trigger getters/setters that call $ because we'll ignore it anyways
      stack.push(returns);

      if (withOutput) {
        console.log('\n\nEvaluated $ calls for ' + desc + ':', stack);
      }

    } catch (e) {
      const msg = String(e?.message ?? e)
        .replace(/^.*is not a constructor.*$/, '<ref> is not a constructor')
        .replace(/^.*is not iterable.*$/, '<ref> is not iterable')
        .replace(/^.* is not defined.*$/, '<ref> is not defined');
      stack.push('<crash[ ' + msg + ' ]>');

      if (withOutput) {
        console.log('\n\nEvaluated $ calls for ' + desc + ':', stack.concat(e?.message ?? e));
      }
    }
  }
  ev('input', fin, evalled.$in);
  ev('normalized', output.normalized, evalled.$norm);
  ev('output', output.files, evalled.$out);

  //if (!lastError) {
  //  const jin = JSON.stringify([evalled.in, evalled.$in]);
  //  if (jin !== JSON.stringify([evalled.norm, evalled.$norm])) {
  //    lastError = new Error('Eval mismatch between input and normalized code');
  //  } else if (jin !== JSON.stringify([evalled.out, evalled.$out])) {
  //    lastError = new Error('Eval mismatch between input and normalized code');
  //  }
  //}

  if (withOutput) {
    console.log('\n')
    console.groupEnd();
  }

  if (lastError) {
    if (!withOutput) {
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

  const md2 = toMarkdownCase({ md, mdHead, mdChunks, fname, fin, output, evalled });
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

  if (withOutput) {
    console.log('################################################### end of test', caseIndex + 1, '/', testCases.length, '[', fname, ']');
    console.log();
    console.log(md2);
    console.log('###################################################', caseIndex + 1, '/', testCases.length, '[', fname, ']');
  }
}
