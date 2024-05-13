import path from 'path';

import Prettier from 'prettier';
import {astToPst} from "../src/utils/ast_to_pst.mjs"
import {verifyPst} from "../src/utils/verify_pst.mjs"
import {printPst} from "../src/utils/print_pst.mjs"
import {setPrintPids} from "../lib/printer.mjs";
import {tmat} from "../src/utils.mjs"

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
        '> (verbatim file)\n\n#TODO',
      mdOptions: {},
      mdChunks: ['## Input\n\n`````js filename=intro\n' + md + '\n`````\n'],
      fin: {
        intro: md,
      },
    };
  } else if (md[0] === '/' && md[1] === '/') {
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
        md.slice(3, md.indexOf('\n')) +
        '\n\n#TODO',
      mdOptions: {},
      mdChunks: ['## Input\n\n`````js filename=intro\n' + md.slice(md.indexOf('\n')).trim() + '\n`````\n'],
      fin: {
        intro: md.slice(md.indexOf('\n')),
      },
    };
  } else if (md[0] === '#') {
    const [mdHead, ...chunks] = md.split('\n## ').filter((s) => !s.startsWith('Eval\n'));
    const mdInput = chunks.filter((s) => s.startsWith('Input\n'))[0];
    const blk = (chunks.filter((s) => s.startsWith('Options\n'))[0] ?? '').trim();
    const mdOptions = Array.from(blk.matchAll(/^ *- *(\w+)(?:=(.+))?$/gm)).reduce(
      (options, match) => {
        let [, name, value] = match;
        name = name.trim();
        switch (name.trim()) {
          case 'maxPass':
          case 'cloneLimit':
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
            value = true;
            break;
          case 'unroll':
            value = parseInt(value.trim());
            if (isNaN(value)) throw new Error('Test case contained invalid value for `' + name + '` (' + value + ')');
            break;
          case 'unrollTrue':
            value = parseInt(value.trim());
            if (isNaN(value)) throw new Error('Test case contained invalid value for `' + name + '` (' + value + ')');
            break;
          case 'implicitThis':
            value = value.trim();
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
            // Remove these names because they will be auto-generated (or maybe because ew don't want them?)
            !s.startsWith('Output\n') &&
            !s.startsWith('Pre Normal\n') &&
            !s.startsWith('Normalized\n') &&
            !s.startsWith('Uniformed\n') &&
            !s.startsWith('Globals\n') &&
            !s.startsWith('PST Output\n') &&
            !s.startsWith('Result\n'),
        )
        .map((s) => '## ' + s.trim()),
      fin: {},
    };

    const fin = mdInput.replace(/\n`````js(?:[ \t]+filename=(.*?))\n([\s\S]*?)\n`````\n/g, (_, name = intro, code) => {
      const n = name.trim();
      if (testCase.fin[n]) throw new Error('Duplicate name: ' + n);
      testCase.fin[n] = code.trim();
    });
    if (!fin?.length) throw new Error('Invalid test case');

    return testCase;
  } else {
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

export function toPreResult(obj) {
  return (
    '\n\n## Pre Normal\n\n' +
    Object.keys(obj)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => '`````js filename=' + key + '\n' + fmat(obj[key]).trim() + '\n`````')
      .join('\n\n')
  );
}

export function toNormalizedResult(obj) {
  return (
    '\n\n## Normalized\n\n' +
    Object.keys(obj)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => '`````js filename=' + key + '\n' + fmat(obj[key]).trim() + '\n`````')
      .join('\n\n')
  );
}

export function toEvaluationResult(evalled, implicitGlobals, skipFinal) {
  function printStack(stack) {
    return stack
      .map((s, i) => {
        let code = fmat('(' + s + ')').slice(0, -2); // drop newline and semi
        if (code[0] === '"' || code[0] === "'") code = code.slice(1, -1);
        if (code[0] === '[' && code[code.length - 1] === ']') code = code.slice(1, -1);
        return ' - ' + (i === stack.length - 1 ? 'eval returned: ' : i + 1 + ': ') + code;
      })
      .join('\n');
  }

  const printOutput = printStack(evalled.$in);
  const preOutput = printStack(evalled.$pre);
  const normalizedOutput = printStack(evalled.$norm);
  const finalOutput = printStack(evalled.$out);

  const preEvalResult = printOutput === preOutput ? ' Same' : ' BAD%!\n' + printOutput;
  const normalizedEvalResult = preOutput === normalizedOutput ? ' Same' : ' BAD?!\n' + normalizedOutput;
  const finalEvalResult = skipFinal
    ? ''
    : 'Final output calls:' + (printOutput === finalOutput ? ' Same\n' : ' BAD!!\n' + finalOutput + '\n');

  return (
    '\n\n## Globals\n\n' +
    (implicitGlobals.size > 0
      ? 'BAD@! Found ' + implicitGlobals.size + ' implicit global bindings:\n\n' + [...implicitGlobals].join(', ')
      : 'None') +
    '\n\n## Result\n\n' +
    'Should call `$` with:\n' +
    printOutput +
    '\n\n' +
    'Pre normalization calls:' +
    preEvalResult +
    '\n\n' +
    'Normalized calls:' +
    normalizedEvalResult +
    '\n\n' +
    finalEvalResult +
    ''
  );
}

export function toMarkdownCase({ md, mdHead, mdOptions, mdChunks, fname, fin, output, evalled, lastError, isExpectingAnError, leGlobalSymbols }, CONFIG) {
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
        .split('/')
        .map((s) => (s ? s.replace(/_/g, ' ').trim() : '{??}'))
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' > '),
  );

  const mdInput = CONFIG.logPasses ? '<trimmed, see logs>' : mdChunks.join('\n\n').trim();

  // Drop the symbols that preval defines from the list of implicit globals
  leGlobalSymbols.forEach(name => output.implicitGlobals.delete(name));

  const wasRefTest = CONFIG.refTest || mdOptions?.refTest;

  let mdBody =
    (CONFIG.logPasses ? '<trimmed, see logs>' : (
      (wasRefTest || CONFIG.onlyOutput ? '' : toPreResult(output.pre)) +
      (wasRefTest || CONFIG.onlyOutput ? '' : toNormalizedResult(output.normalized)) +
      (!wasRefTest ? '' : (
        (setPrintPids(true), '') +

        '\n\n## Output\n\n' +
        '(Annotated with pids)\n\n' +
        Object.keys(output.files)
        .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
        .map((key) => '`````filename=' + key + '\n' + fmat(tmat(output.lastPhase1Ast, true)).trim() + '\n`````')
        .join('\n\n') +

        (setPrintPids(false), '')
      )) +
      (wasRefTest ? '' : (
        '\n\n## Output\n\n' +
        Object.keys(output.files)
        .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
        .map((key) => '`````js filename=' + key + '\n' + fmat(output.files[key]).trim() + '\n`````')
        .join('\n\n')
      )) +
      (wasRefTest ? '' : (
        '\n\n## PST Output\n\n' +
        'With rename=true\n\n' +
        Object.keys(output.files)
        .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
        .map((key) => {
          const pst = astToPst(output.lastAst); // TODO: -> output.files[key] ?
          //console.log('PST:');
          //console.dir(pst, {depth: null});
          verifyPst(pst);

          const code = printPst(pst, {
            rename: true,
            globals: new Set(Array.from(output.implicitGlobals).concat(Array.from(output.explicitGlobals))),
          });

          return '`````js filename=' + key + '\n' + code.trim() + '\n`````';
        })
        .join('\n\n')
      )) +
      (wasRefTest ? '\n\nRef tracking result:\n\n' + createOpenRefsState(output.globallyUniqueNamingRegistry) : toEvaluationResult(evalled, output.implicitGlobals, false))
    )) +
  '';

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
          rw.action === 'read' ? (rw.reachesWrites.size ? ' | ' + Array.from(rw.reachesWrites).map(write => write.node.$p.pid) : ' | none (TDZ?)').padEnd(10, ' ') : ' | '.padEnd(13, '#'),
          rw.action === 'write' ? (rw.reachedByReads.size ? ' | ' + Array.from(rw.reachedByReads).map(read => read.node.$p.pid) : ' | not read').padEnd(14, ' ') : '',
          rw.action === 'write' ? (rw.reachesWrites.size ? ' | ' + Array.from(rw.reachesWrites).map(write => write.node.$p.pid) : ' | none').padEnd(17, ' ') : '',
          rw.action === 'write' ? (rw.reachedByWrites.size ? ' | ' + Array.from(rw.reachedByWrites).map(write => write.node.$p.pid) : ' | none') : '',
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

/**
 // hack to get package version at certain day blabla

 var names = [
 'gatsby',
 'gatsby-image',
 'gatsby-link',
 'gatsby-plugin-google-tagmanager',
 'gatsby-plugin-i18next',
 'gatsby-plugin-react-helmet',
 //'gatsby-plugin-react-svg',
 //'gatsby-plugin-resolve-src',
 //'gatsby-plugin-robots-txt',
 'gatsby-plugin-sharp',
 'gatsby-plugin-styled-components',
 'gatsby-react-router-scroll',
 'gatsby-source-contentful',
 'gatsby-source-filesystem',
 'gatsby-transformer-remark',
 'gatsby-transformer-sharp',
 ];
 //names.forEach(name => { // only need to do this once unless you need to refresh. it just stores the remote fetch locally.
//require('https').get('https://registry.npmjs.org/' + name, res => { res.setEncoding('utf8'); let body = ''; res.on('data', d => body += d); res.on('end', () => console.log('finished:', name, require('fs').writeFileSync('npm.' + name + '.json', body, 'utf8')))})
//})
 var maps = new Map
 var init = new Map
 names.forEach(name => {
  var json = JSON.parse(require('fs').readFileSync('npm.' + name + '.json')).time;
  var older = 'latest'
  for (const key in json) {
    if (!/^[\d.]+$/.test(key)) delete json[key]; // prune anything that's not a regular publish
    else if (json[key] < '2020-10-15') older = key, delete json[key]; // prune older than target contentful ver pubdate. remember the last one before target date
  }
  var map = new Map; for (const key in json) map.set(json[key].slice(0, 10), key);
  maps.set(name, map)
  init.set(name, older); // initial version (as per prior to target date)
})
 init

 // start at date of target version and walk forward to today. if any version changed on any day then copy the version and stamp it as a set
 // https://github.com/gatsbyjs/gatsby/commit/2494ae111f56e412071b103f202124c71c309e9b#diff-01f6ae9ad71849950b24e4800c23defcd1440600c57d6cabbf2a4cac7bfbe8d0 (oct 15th)
 var sets = new Map; var today = new Date; var day = new Date('2020-10-15');
 while (day <= today) {
  var c = false;
  maps.forEach((vers, name) => { if (vers.has(day.toISOString().slice(0,10))) c =init.set(name, vers.get(day.toISOString().slice(0,10))) && (c || name === 'gatsby-source-contentful'); })
  if (c) sets.set(day.toISOString().slice(0,10), new Map(init))
  day.setDate(day.getDate() + 1)
}

 var arr = []
 sets.forEach((map, day) => arr.push('// ' + day + '\nyarn --ignore-engines add ' + [...map.entries()].map(([name, ver]) => name + '@' + ver).join(' ')) )
 console.log(arr.join('\n\n'))
 */
