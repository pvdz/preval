import path from 'path';

import Prettier from 'prettier';
import {astToPst} from "../src/utils/ast_to_pst.mjs"
import {verifyPst} from "../src/utils/verify_pst.mjs"
import {printPst} from "../src/utils/print_pst.mjs"
import {setPrintPids} from "../lib/printer.mjs";
import {tmat} from "../src/utils.mjs"
import { printPcode, serializePcode } from '../src/pcode.mjs';

export const RED = '\x1b[31;1m';
export const GREEN = '\x1b[32m';
export const YELLOW = '\x1b[33m';
export const BLUE = '\x1b[34;1m';
export const WHITE = '\x1b[37m';
export const BOLD = '\x1b[;1;1m';
export const RESET = '\x1b[0m';
export const WHITE_BLACK = '\x1b[30;47m';
export const ORANGE = '\x1b[38;5;214m';

export const GOOD = '\x1b[40m 🙂 \x1b[0m';
export const BAD = '\x1b[41m 👎 \x1b[0m';

export function ASSERT(a, desc = '', ...rest) {
  if (!a) {
    console.log('ASSERT failed: ' + desc);
    console.log('rest:', rest);
    throw new Error('ASSERT failed: ' + desc + '; ' + JSON.stringify(rest));
  }
}

export function fromMarkdownCase(md, fname, config) {
  // A test case either starts with `//` (new test case) or with `#` (existing test case). Reject the rest.
  // Returns a test case: {md, fname, head, fin}

  if (config.fileVerbatim) {
    console.log('Reading', fname, 'as the whole test case');
    return {
      fname,
      md,
      mdHead:
        '# Preval test case\n\n# ' +
        path.basename(fname) +
        '\n\n' +
        '> ' +
        fname
          .slice(fname.indexOf('tests/cases/') + 'tests/cases/'.length, -3)
          .split('/')
          .join(' > ') +
        '\n' +
        '>\n' +
        '> (verbatim file)',
      mdOptions: {},
      mdChunks: ['## Input\n\n`````js filename=intro\n' + md + '\n`````\n'],
      fin: {
        intro: md,
      },
    };
  }
  else if (md[0] === '/' && md[1] === '/') {
    console.log('Converting new case in', fname, 'to an actual test case');
    // Assume new test case
    return {
      fname,
      md,
      mdHead:
        '# Preval test case\n\n# ' +
        path.basename(fname) +
        '\n\n' +
        '> ' +
        fname
          .slice(fname.indexOf('tests/cases/') + 'tests/cases/'.length, -3)
          .split('/')
          .join(' > ') +
        '\n' +
        '>\n' +
        '> ' +
        md.slice(3, md.indexOf('\n')),
      mdOptions: {},
      mdChunks: ['## Input\n\n`````js filename=intro\n' + md.slice(md.indexOf('\n')).trim() + '\n`````\n'],
      fin: {
        intro: md.slice(md.indexOf('\n')),
      },
    };
  }
  else if (md[0] === '#') {
    const [mdHead, ...chunks] = md.split('\n## ').filter((s) => !s.startsWith('Eval\n'));
    const mdInput = chunks.filter((s) => s.startsWith('Input\n'))[0];
    const blk = (chunks.filter((s) => s.startsWith('Options\n'))[0] ?? '').trim();
    const mdOptions = Array.from(blk.matchAll(/^ *- *(\w+)(?: *[:=] *(.+))?$/gm)).reduce(
      (options, match) => {
        let [, name, value] = match;
        name = name.trim();
        switch (name.trim()) {
          case 'globals': {
            // Globals to ignore when reporting implicit globals
            // Space delimited list
            value = value.split(' ').map(s => s.trim()).filter(Boolean);
            break;
          }
          case 'cloneLimit':
          case 'loopProtectLimit':
          case 'maxPass':
            value = parseInt(value.trim());
            if (isNaN(value)) throw new Error('Test case contained invalid value for `' + name + '` (' + value + ')');
            break;
          case 'refTest':
            value = true;
            break;
          case 'skipEval':
          case 'skipEvalInput':
          case 'skipEvalPre':
          case 'skipEvalNormalized':
          case 'skipEvalOutput':
          case 'skipEvalDenorm':
            value = true;
            break;
          case 'unroll':
            value = parseInt(value.trim());
            if (isNaN(value)) throw new Error('Test case contained invalid value for `' + name + '` (' + value + ')');
            break;
          case 'implicitThis':
            value = value.trim();
            break;
          case 'pcode':
            name = 'pcodeTest';
            value = true;
            break;
          case 'seed':
            name = 'seed';
            value = parseInt(value.trim());
            break;
          default:
            throw new Error('Test case contained unsupported option: `' + name + '` (with value `' + value + '`)');
        }
        options[name] = value;
        return options;
      },
      {},
    );
    ASSERT(mdInput, 'all test cases should have an input block', fname);

    const testCase = {
      md,
      fname,
      mdHead: mdHead.trim(),
      mdOptions,
      mdChunks: chunks
        .filter(
          (s) =>
            // Remove these names because they will be auto-generated (or maybe because we don't want them anymore?)
            !s.startsWith('Output\n') &&
            !s.startsWith('Pcode output\n') &&
            !s.startsWith('Pre Normal\n') &&
            !s.startsWith('Normalized\n') &&
            !s.startsWith('Uniformed\n') &&
            !s.startsWith('Globals\n') &&
            !s.startsWith('PST Output\n') &&
            !s.startsWith('Denormalized\n') &&
            !s.startsWith('Settled\n') &&
            !s.startsWith('PST Settled\n') &&
            !s.startsWith('PST Output\n') &&
            !s.startsWith('PST Output:\n') &&
            !s.startsWith('Result\n') &&
            !s.startsWith('Todos triggered\n') &&
            !s.startsWith('Ref tracking result\n') &&
            !s.startsWith('Pcode result\n') &&
            !s.startsWith('Runtime Outcome\n'),
        )
        .map((s) => {
          const t = s.trim();
          const x = '## ' + t
          if (s.startsWith('Input\n') || s.startsWith('Options\n')) return x;
          if (s.endsWith('HEADERCHECKME')) return x;
          return x + '\nHEADERCHECKME\n';
        }),
      fin: {},
    };

    const fin = mdInput.replace(/\n`````js(?:[ \t]+filename=(.*?))\n([\s\S]*?)\n`````\n/g, (_, name = 'intro', code) => {
      const n = name.trim();
      if (testCase.fin[n]) throw new Error('Duplicate name: ' + n);
      testCase.fin[n] = code.trim();
    });
    if (!fin?.length) throw new Error('Invalid test case');

    return testCase;
  }
  else {
    throw new Error('Invalid test case? Does not start with `//` nor `#`: ' + fname);
  }
}

export function fmat(code) {
  try {
    return Prettier.format(code, {
      parser: 'babel',
      ...{
        // maybe keep in sync with prettierrc? prolly fairly immutable and irrelevant for tests anyways...
        printWidth: 140,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
    });
  } catch (e) {
    // Prettier error implies invalid transformation. Uups.
    throw new Error('Prettier error. Implies the resulting transform is invalid.\n' + e.message);
  }
}

function toTodosSection(todos) {
  return (
    '## Todos triggered\n\n\n' +
    (Array.from(todos).map(desc => '- (todo) ' + desc).join('\n') || 'None')
  )
}

export function toPreNormalSection(obj) {
  return (
    '## Pre Normal\n\n\n' + // two empty lines. this way diff always captures this as the hunk header (with the default U3)
    Object.keys(obj)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => '`````js filename=' + key + '\n' + fmat(obj[key]).trim() + '\n`````')
      .join('\n\n')
  );
}

export function toNormalizedSection(obj) {
  return (
    '## Normalized\n\n\n' + // two empty lines. this way diff always captures this as the hunk header (with the default U3)
    Object.keys(obj)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => '`````js filename=' + key + '\n' + fmat(obj[key]).trim() + '\n`````')
      .join('\n\n')
  );
}

function toSettledSection(obj) {
  return (
    '## Settled\n\n\n' + // two empty lines. this way diff always captures this as the hunk header (with the default U3)
    Object.keys(obj)
    .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
    .map((key) => '`````js filename=' + key + '\n' + fmat(obj[key]).trim() + '\n`````')
    .join('\n\n')
  )
}

function toDenormalizedSection(obj) {
  return (
    '## Denormalized\n(This ought to be the final result)\n\n' + // two lines. this way diff always captures this as the hunk header (with the default U3)
    Object.keys(obj)
    .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
    .map((key) => '`````js filename=' + key + '\n' + fmat(obj[key]).trim() + '\n`````')
    .join('\n\n')
  )
}

function toPstSettledSection(obj, implicitGlobals, explicitGlobals) {
  return (
    '## PST Settled\n' +
    'With rename=true\n\n' +
    Object.keys(obj)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => {
        const pst = obj[key];
        //console.log('PST:');
        //console.dir(pst, {depth: null});
        verifyPst(pst);

        const code = printPst(pst, {
          rename: true,
          globals: new Set(Array.from(implicitGlobals).concat(Array.from(explicitGlobals))),
        });

        return '`````js filename=' + key + '\n' + code.trim() + '\n`````';
      })
      .join('\n\n')
  )
}

function toSpecialRefTestSection(obj) {
  setPrintPids(true);
  const str = (
    // Special ref test result
    '## Output\n\n' +
    '(Annotated with pids)\n\n' +
    Object.keys(obj)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => '`````filename=' + key + '\n' + fmat(tmat(obj[key], true)).trim() + '\n`````')
      .join('\n\n')
  );
  setPrintPids(false);

  return str;
}

export function toSpecialPcodeSection(pcodeData) {
  // Special pcode test result
  return (
    '## Pcode output\n\n\n' +
    Object.keys(pcodeData) // fname
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((fname) => {
        const list = [];
        pcodeData[fname].forEach(({pcode, name}, id) => {
          if (typeof id === 'number') return;

          list.push(`${name} =\n${
            printPcode(pcode, 4)
          }`);
        });
        return '`````file' + fname + '\n' +
          list.join('\n\n')
          .trim() +
          '\n`````\n\n'
      })
      .join('\n\n')
  );
}

export function toEvaluationResult(evalled, implicitGlobals, skipFinal, globalsToIgnore = []) {
  function printStack(stack) {
    ASSERT(stack, 'missing stack...?');
    return stack
      .map((s, i) => {
        let code = fmat('(' + s + ')').slice(0, -2); // drop newline and semi
        if (code[0] === '"' || code[0] === "'") code = code.slice(1, -1);
        if (code[0] === '[' && code[code.length - 1] === ']') code = code.slice(1, -1);
        return ' - ' + (i === stack.length - 1 ? 'eval returned: ' : i + 1 + ': ') + code;
      })
      .join('\n');
  }

  const inputOutput = printStack(evalled.$in);
  const preOutput = printStack(evalled.$pre);
  const normalizedOutput = printStack(evalled.$norm);
  const settledOutput = printStack(evalled.$settled);
  const denormOutput = printStack(evalled.$denorm);

  const preEvalResult = inputOutput === preOutput ? ' Same' : ' BAD!%\n' + inputOutput;
  const normalizedEvalResult = inputOutput === normalizedOutput ? ' Same' : ' BAD!?\n' + normalizedOutput;
  const finalEvalResult = skipFinal
    ? ''
    : 'Post settled calls:' + (inputOutput === settledOutput ? ' Same\n\n' : ' BAD!!\n' + settledOutput + '\n\n');
  const denormEvalResult = skipFinal
    ? ''
    : 'Denormalized calls:' + (inputOutput === denormOutput ? ' Same\n' : ' BAD!!\n' + denormOutput + '\n');
  const hasError = !(inputOutput === preOutput && inputOutput === normalizedOutput && (skipFinal || inputOutput === settledOutput) && (skipFinal || inputOutput === denormOutput));

  // Only show this when the transforms mismatch the input. Otherwise ignore.
  const input_invOutput = printStack(evalled.$in_inv);
  const pre_invOutput = printStack(evalled.$pre_inv);
  const normalized_invOutput = printStack(evalled.$norm_inv);
  const settled_invOutput = printStack(evalled.$settled_inv);
  const denorm_invOutput = printStack(evalled.$denorm_inv);
  const result_pcode = evalled.$pcode;

  const preEvalResult_inv = input_invOutput !== pre_invOutput ? '\n\nPre normalization inverse calls: BAD!%\n' + inputOutput : '';
  const normalizedEvalResult_inv = input_invOutput !== normalized_invOutput ? '\n\nNormalization inverse calls: BAD!?\n' + normalizedOutput : '';
  const finalEvalResult_inv = skipFinal
    ? ''
    : (input_invOutput !== settled_invOutput ? '\n\nOutput inverse calls: BAD!!\n' + settled_invOutput + '\n\n'  : '');
  const denormEvalResult_inv = skipFinal
    ? ''
    : (input_invOutput !== settled_invOutput ? '\n\nDenormalized inverse calls: BAD!!\n' + denorm_invOutput + '\n'  : '');

  const globalsLeft = new Set(implicitGlobals);
  const ignoresLeft = globalsToIgnore.slice(0);
  if (globalsToIgnore) {
    for (const name of globalsLeft) {
      const pos = ignoresLeft.indexOf(name);
      if (pos >= 0) {
        ignoresLeft.splice(pos, 1);
        globalsLeft.delete(name);
      }
    }
  }

  return (
    '## Globals\n\n\n' +
    (globalsLeft.size > 0
      ? 'BAD@! Found ' + globalsLeft.size + ' implicit global bindings:\n\n' + [...globalsLeft].join(', ')
      : 'None' + (implicitGlobals.size ? ' (except for the ' + implicitGlobals.size + ' globals expected by the test)' : '')) +
    (ignoresLeft.size > 0
      ? '\n\nBAD@@! Test expected ' + ignoresLeft.size + ' implicit global bindings that were not seen:\n\n' + [...ignoresLeft].join(', ') + '\n'
      : ''
    ) +
    '\n\n\n## Runtime Outcome\n\n\n' +
    'Should call `$` with:\n' +
    inputOutput +
    '\n\n' +
    'Pre normalization calls:' +
    preEvalResult +
    '\n\n' +
    'Normalized calls:' +
    normalizedEvalResult +
    '\n\n' +
    finalEvalResult +
    denormEvalResult +
    (!hasError && (preEvalResult_inv || normalizedEvalResult_inv || finalEvalResult_inv) ?
      '\nInverse input result (there was at least one mismatch even though actual test evalled equal):\n' +
      input_invOutput
    : '') +
    (!hasError ? preEvalResult_inv : '') +
    (!hasError ? normalizedEvalResult_inv : '') +
    (!hasError ? finalEvalResult_inv : '') +
    (!hasError ? denormEvalResult_inv : '') +
    (result_pcode ? result_pcode : '') +
    ''
  );
}

export function toMarkdownCase({ md, mdHead, mdOptions, mdChunks, fname, fin, output, evalled, lastError, isExpectingAnError, leGlobalSymbols, pcodeData, todos}, CONFIG) {
  // Note: output = contents from tests/index.mjs
  if (lastError) {
    return mdHead + '\n\n' + mdChunks.join('\n\n').trim() + '\n\n## Output\n\nThrew expected error:' + '\n\n' + lastError.message + '\n';
  }

  if (isExpectingAnError) {
    return mdHead + '\n\n' + mdChunks.join('\n\n').trim() + '\n\n## Output\n\nBAD~! Expected to throw an error but none was thrown ;(\n';
  }

  mdHead = mdHead.replace(
    /# Preval test case\n\n# .*\n\n> .*/,
    '# Preval test case\n\n# ' +
      path.basename(fname).trim() +
      '\n\n> ' +
      fname
        .slice(0, -3) // Remove .md
        .replace(/.*tests\/cases\//, '')
        .replace(/.*tests\/_tofix\//, 'tofix > ')
        .split('/')
        .map((s) => (s ? s.replace(/_/g, ' ').trim() : '{??}'))
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' > '),
  );

  const mdInput = (CONFIG.logPasses || CONFIG.logPhases) ? '<trimmed, see logs>' : mdChunks.join('\n\n').trim();

  // Drop the symbols that preval defines from the list of implicit globals
  leGlobalSymbols.forEach(name => output.implicitGlobals.delete(name));

  const wasRefTest = CONFIG.refTest || mdOptions?.refTest;
  const wasPcodeTest = CONFIG.pcodeTest || mdOptions?.pcodeTest;

  let mdBody;
  if (CONFIG.logPasses || CONFIG.logPhases) {
    mdBody = '<trimmed, see logs>';
  }
  else if (wasPcodeTest) {
    mdBody = '\n\n\n' + [
      toSpecialPcodeSection(pcodeData),
      toTodosSection(todos),
      '## Pcode result\n\n\n' + evalled.$pcode,
    ].filter(Boolean).join('\n\n\n');
  }
  else if (wasRefTest) {
    mdBody = '\n\n\n' + [
      toSpecialRefTestSection(output.lastPhase1Ast),
      toTodosSection(todos),
      '## Ref tracking result\n\n\n' + createOpenRefsState(output.globallyUniqueNamingRegistry),
    ].filter(Boolean).join('\n\n\n');
  }
  else {
    mdBody = '\n\n\n' + [
      toSettledSection(output.files),
      toDenormalizedSection(output.denormed),
      toPstSettledSection(output.settledPst, output.implicitGlobals, output.explicitGlobals),
      toTodosSection(todos),
      toEvaluationResult(evalled, output.implicitGlobals, false, mdOptions.globals),
      //(wasRefTest || CONFIG.onlyOutput ? '' : toPreNormalSection(output.pre)),
      //(wasRefTest || wasPcodeTest || CONFIG.onlyOutput ? '' : toNormalizedSection(output.normalized)),
    ].filter(Boolean).join('\n\n\n');
  }

  if (CONFIG.trimDollar) mdBody = mdBody.replace(/\$\d+/g, '');

  return '' + mdHead + '\n\n' + mdInput + mdBody;
}

function createOpenRefsState(globallyUniqueNamingRegistry) {
  const arr = [];
  let maxlen = 10;
  Array.from(globallyUniqueNamingRegistry.entries()).map(([name, meta]) => {
    if (meta.isImplicitGlobal || meta.isGlobal || meta.isBuiltin) return;
    arr.push(`${name}:`);
    // Note: meta.reOrder is created in phase2
    (meta.reads || []).concat(meta.writes || []).sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    ).forEach(rw => {
      maxlen = Math.max(maxlen, rw.node.name.length);
      arr.push([
          '  - ' + rw.action[0] + (' @' + rw.node.$p.pid).padEnd(maxlen - 2, ' ') + ' ',
          rw.action === 'read' ? (rw.reachesWrites.size ? ' | ' + Array.from(rw.reachesWrites).map(write => +write.node.$p.pid).sort((a,b)=>a-b) : ' | none (unreachable?)').padEnd(10, ' ') : ' | '.padEnd(13, '#'),
          rw.action === 'write' ? (rw.reachedByReads.size ? ' | ' + Array.from(rw.reachedByReads).map(read => +read.node.$p.pid).sort((a,b)=>a-b) : ' | not read').padEnd(14, ' ') : '',
          rw.action === 'write' ? (rw.reachesWrites.size ? ' | ' + Array.from(rw.reachesWrites).map(write => +write.node.$p.pid).sort((a,b)=>a-b) : ' | none').padEnd(17, ' ') : '',
          rw.action === 'write' ? (rw.reachedByWrites.size ? ' | ' + Array.from(rw.reachedByWrites).map(write => +write.node.$p.pid).sort((a,b)=>a-b) : ' | none') : '',
        ].filter(Boolean).join('').trimEnd()
      );
    });
    arr.push('');
  });
  arr.unshift('    ' + (' '.repeat(maxlen)) + ' | reads      | read by     | overWrites     | overwritten by');
  return arr.join('\n');
}

async function question(msg) {
  // Probably massive overkill :/
  let resolve,
    p = new Promise((ok) => (resolve = ok));
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(msg + ' ', (answer) => resolve(answer));
  let r = await p;
  rl.close();
  return r;
}
async function yn(msg = 'Answer?') {
  // Keep asking the question in console until the user types `y`, `yes`, `n`, or `no`.
  let answer = String(await question(msg)).toLowerCase();
  answer = String(answer).toLowerCase();

  if (answer === 'n' || answer === 'no' || answer === 'q') return false;
  while (answer !== 'y' && answer !== 'yes') {
    answer = await question(msg + ': [y, n]');
    answer = String(answer).toLowerCase();

    if (answer === 'n' || answer === 'no' || answer === 'q') return false;
  }

  return true;
}
