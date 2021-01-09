import path from 'path';

import Prettier from 'prettier';

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
      mdChunks: ['## Input\n\n`````js filename=intro\n' + md + '\n`````\n'],
      fin: {
        intro: md,
      },
    };
  } else if (md[0] === '/' && md[1] === '/' && md[2] === ' ') {
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
      mdChunks: ['## Input\n\n`````js filename=intro\n' + md.slice(md.indexOf('\n')).trim() + '\n`````\n'],
      fin: {
        intro: md.slice(md.indexOf('\n')),
      },
    };
  } else if (md[0] === '#') {
    const [mdHead, ...chunks] = md.split('\n## ').filter((s) => !s.startsWith('Eval\n'));
    const mdInput = chunks.filter((s) => s.startsWith('Input\n'))[0];
    ASSERT(mdInput, 'all test cases should have an input block', fname);

    const testCase = {
      md,
      fname,
      mdHead: mdHead.trim(),
      mdChunks: chunks.filter((s) => !s.startsWith('Output\n') && !s.startsWith('Normalized')).map((s) => '## ' + s.trim()),
      fin: {},
    };

    const fin = mdInput.replace(/\n`````js(?:[ \t]+filename=(.*?))\n([\s\S]*?)\n`````\n/, (_, name = intro, code) => {
      const n = name.trim();
      if (testCase.fin[n]) throw new Error('Duplicate name: ' + n);
      testCase.fin[n] = code.trim();
    });
    if (!fin?.length) throw new Error('Invalid test case');

    return testCase;
  } else {
    throw new Error('Invalid test case? Does not start with `//` nor `#`');
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
    throw new Error('Prettier error. Implies the resulting transform is invalid.\n' + e);
  }
}

export function toMarkdownCase({ md, mdHead, mdChunks, fname, fin, output, evalled }) {
  const content =
    mdHead +
    '\n\n' +
    mdChunks.join('\n\n').trim() +
    //'\n\n## Eval' +
    //'\n\nResult of executing test case: ' +
    //evalled.in +
    //'\n\nCalls to `$` (' +
    //evalled.$in.length +
    //'x):\n' +
    //evalled.$in.map((obj) => '\n - ' + JSON.stringify(obj)).join(',') +
    '\n\n## Normalized\n\n' +
    Object.keys(output.normalized)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => '`````js filename=' + key + '\n' + fmat(output.normalized[key]).trim() + '\n`````')
      .join('\n\n') +
    '\n\n## Output\n\n' +
    Object.keys(output.files)
      .sort((a, b) => (a === 'intro' ? -1 : b === 'intro' ? 1 : a < b ? -1 : a > b ? 1 : 0))
      .map((key) => '`````js filename=' + key + '\n' + fmat(output.files[key]).trim() + '\n`````')
      .join('\n\n') +
    '\n';

  return content;
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
