import { clearStdio, setStdio, log, tmat, fmat, group, groupEnd } from './utils.mjs';

import globals from './globals.mjs';
import { parseCode } from './normalize/parse.mjs';
import { phaseNormalize } from './normalize/normalize.mjs';
import { phaseNormalOnce } from './normalize/normal_once.mjs';
import { prepareNormalization } from './normalize/prepare.mjs';
import { aliasThisAndArguments } from './normalize/aliasing.mjs';
import fs from 'fs';
import path from 'path';

import { phase0 } from './reduce_static/phase0.mjs';
import { phase1 } from './reduce_static/phase1.mjs';
import { phase2 } from './reduce_static/phase2.mjs';
import { phasePrimitiveArgInlining } from './reduce_static/phase_primitive_arg_inlining.mjs';

let VERBOSE_TRACING = true;

const MARK_NONE = 0;
const MARK_TEMP = 1;
const MARK_PERM = 2;

export function preval({ entryPointFile, stdio, verbose, resolve, req, stopAfterNormalize, options = {} }) {
  if (stdio) setStdio(stdio, verbose);
  else clearStdio();

  {
    const { logDir, logPasses, maxPass, cloneLimit, ...rest } = options;
    if (JSON.stringify(rest) !== '{}') throw new Error('Preval: Unsupported options received:', rest);
  }

  if (verbose && VERBOSE_TRACING) {
    console.log('Preval options:');
    console.log(options);
  }

  const entryPoint = resolve(entryPointFile);

  const modules = new Map([
    [
      entryPoint,
      {
        fname: entryPoint, // result of resolve(value)
        mark: MARK_NONE, // 0 = none, 1 = temp, 2 = perm. To figure out proper resolution order after phase1.
        parents: new Set(), // fnames (strings) that import this file
        children: new Set(), // fnames (strings) that this file imports
        inputCode: '',
        normalizedCode: '',
        specialCode: '',
        outputCode: '',
        fdata: undefined,
      },
    ],
  ]);

  // Create global state for preval
  const program = {
    modules: modules,
    evalOrder: undefined,
    main: entryPoint,
    cloneCounts: new Map(), // how many clones did we generate for a particular function?
    cloneMap: new Map(), // "Function cloning to inline params"-cache
  };

  const contents = {
    // note: test runner will auto-Prettier the result. Perhaps this should be done here..? Or let the user take care of that?
    // TODO: this is "final output". Rename it.
    files: {},
    // After the first pass for one-time transforms
    pre: {},
    // For debug/testing
    normalized: {},
    // Was used for discovering code that wasn't normalized. Currently unused.
    special: {},
  };

  const normalizeQueue = [entryPoint]; // Order is not relevant in this phase
  const allFileNames = [entryPoint]; // unordered but there's no point in a set

  while (normalizeQueue.length) {
    const nextFname = normalizeQueue.pop(); // Order should not matter for normalization purposes
    const mod = modules.get(nextFname);
    log('\nNext fname in queue: "' + nextFname + '"');

    // First normalize the code. Then serialize that AST. Then parse it again (because scope tracking).
    // Scope tracking by parser not looking so hot now, eh.
    const inputCode = req(nextFname);
    if (inputCode.length > 10 * 1024) VERBOSE_TRACING = false; // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.

    const preFdata = parseCode(inputCode, nextFname);
    prepareNormalization(preFdata, resolve, req, verbose); // I want a phase1 because I want the scope tracking set up for normalizing bindings
    phaseNormalOnce(preFdata);
    const preCode = tmat(preFdata.tenkoOutput.ast, true);

    const fdata = parseCode(preCode, nextFname);
    prepareNormalization(fdata, resolve, req, verbose); // I want a phase1 because I want the scope tracking set up for normalizing bindings
    aliasThisAndArguments(fdata, resolve, req, verbose);
    phaseNormalize(fdata, nextFname);

    mod.children = new Set(fdata.imports.values());
    mod.fdata = fdata;
    mod.inputCode = inputCode;
    mod.preCode = preCode;
    mod.normalizedCode = tmat(fdata.tenkoOutput.ast, true);
    mod.specialCode = 'unused';

    contents.normalized[nextFname] = mod.normalizedCode;
    contents.pre[nextFname] = mod.preCode;
    contents.special[nextFname] = mod.specialCode;

    // Inject the discovered imports to the queue so they'll be processed too, if they haven't been found before
    // The imports have one entry per symbol:fname pair so get the unique file names first
    const uniqueFiles = new Set(fdata.imports.values());
    //log('uniqueFiles:', uniqueFiles);
    uniqueFiles.forEach((fname) => {
      const rfname = resolve(fname);
      if (modules.has(rfname)) {
        const mod = modules.get(rfname);
        mod.parents.add(nextFname);
      } else {
        allFileNames.push(rfname);
        modules.set(rfname, {
          fname: rfname,
          mark: MARK_NONE,
          parents: new Set([nextFname]),
          inputCode: '',
          normalizedCode: '',
          preCode: '',
          specialCode: '',
          outputCode: '',
          fdata: undefined,
        });

        normalizeQueue.push(rfname);
      }
    });
  }

  log();
  log('######################################################################################################');
  log('######################################################################################################');
  log('##');
  log('## First phase complete. Discovered', modules.size, 'imported files');
  log('##');
  log('######################################################################################################');
  log('######################################################################################################');
  log();

  if (options.logPasses) {
    log('Logging current state to disk...');
    allFileNames.forEach((fname, i) => {
      fs.writeFileSync(
        path.join(options.logDir, 'preval.pass001.f' + i + '.normalized.log.js'),
        '// Normalized output after one pass [' + fname + ']\n' + contents.normalized[fname],
      );
    });
  }

  group('Resolving correct import order of dependency tree (total ' + allFileNames.length + ' files)');
  // https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search
  const evalOrder = [];
  [...modules.keys()].forEach(function visit(n) {
    const mod = modules.get(n);
    if (VERBOSE_TRACING) group('- visiting "' + n + '", mark = ' + mod.mark);
    if (mod.mark !== MARK_NONE) {
      if (VERBOSE_TRACING) log('  - Already marked, skipping');
      if (VERBOSE_TRACING) groupEnd();
      return;
    }
    if (mod.mark === MARK_TEMP) {
      if (VERBOSE_TRACING) log('  - marked temp');
      if (VERBOSE_TRACING) groupEnd();
      return;
    }
    if (mod.mark === MARK_PERM) {
      console.log('dependency cycle detected');
      console.log('module:');
      console.log({ ...mod, fdata: '<supressed>' });
      if (VERBOSE_TRACING) groupEnd();
      throw new Error('Preval: dependency cycle detected');
    }
    mod.mark = MARK_TEMP;
    if (VERBOSE_TRACING) log(' - imports from', mod.children.size);
    mod.children.forEach(visit);
    mod.mark = MARK_PERM;
    evalOrder.push(n);
    if (VERBOSE_TRACING) groupEnd();
  });
  if (VERBOSE_TRACING) {
    log();
    log('Proper eval order is:');
    log(evalOrder.map((fname) => ' - ' + fname).join('\n'));
  }
  program.evalOrder = evalOrder;
  groupEnd('Order resolved...');

  if (!stopAfterNormalize) {
    // Traverse the dependency tree, bottom to top
    evalOrder.forEach((fname, fi) => {
      let changed = true;
      const mod = modules.get(fname);
      let inputCode = mod.normalizedCode;
      let passes = 0;
      const maxPasses = options.maxPass > 0 ? options.maxPass : 0;
      while (changed) {
        ++passes;
        const fdata = phase0(inputCode, fname);
        do {
          phase1(fdata, resolve, req, verbose); // I want a phase1 because I want the scope tracking set up for normalizing bindings

          changed = phase2(program, fdata, resolve, req, verbose);
          // YOYO
          //if (!changed) changed = phasePrimitiveArgInlining(program, fdata, resolve, req, verbose, options.cloneLimit);
        } while (changed === 'phase1');

        mod.fdata = fdata;

        const outCode = tmat(fdata.tenkoOutput.ast, true);

        if (options.logPasses) {
          log('Logging current result to disk...');
          fs.writeFileSync(
            path.join(options.logDir, 'preval.pass' + String(passes).padStart(3, '0') + '.f' + fi + '.result.log.js'),
            '// Resulting output after one pass [' + fname + ']\n' + outCode,
          );
        }

        changed = outCode !== inputCode;
        if (changed && (!maxPasses || passes < maxPasses)) {
          log('Something changed in phase2 so we will be rerolling it again');
          inputCode = outCode;
          log(
            '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          );

          const fdata = parseCode(inputCode, fname);
          prepareNormalization(fdata, resolve, req, verbose); // I want a phase1 because I want the scope tracking set up for normalizing bindings
          aliasThisAndArguments(fdata, resolve, req, verbose);
          phaseNormalize(fdata, fname);

          inputCode = tmat(fdata.tenkoOutput.ast, true);

          if (options.logPasses) {
            log('Logging current normalized state to disk...');
            fs.writeFileSync(
              path.join(options.logDir, 'preval.pass' + String(passes + 1).padStart(3, '0') + '.f' + String(fi) + '.normalized.log.js'),
              '// Resulting output after ' + (passes + 1) + ' passes [' + fname + ']\n' + outCode,
            );
          }
        } else {
          // Report the implicit globals. Tests should explicitly declare the implicit globals so we can automatically verify
          // that none are accidentally left behind / partially eliminated.
          const set = new Set();
          fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
            if (meta.isImplicitGlobal && !globals.has(name)) set.add(name);
          });
          contents.implicitGlobals = set;

          contents.files[fname] = outCode;
        }

        if (changed && maxPasses && passes >= maxPasses) {
          log('Reached the max number of passes requested. Bailing even though there are changes to process.');
          break;
        }
      }
      log('Ran for', passes, 'passes');
    });
  }

  return contents;
}
