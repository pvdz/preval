import { setVerboseTracing, VERBOSE_TRACING, MARK_NONE, MARK_TEMP, MARK_PERM } from './constants.mjs';
import { clearStdio, setStdio, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, setRefTracing } from './utils.mjs';
import globals from './globals.mjs';

import { parseCode } from './normalize/parse.mjs';
import { phaseNormalize } from './normalize/normalize.mjs';
import { phaseNormalOnce } from './normalize/normal_once.mjs';
import { prepareNormalization } from './normalize/prepare.mjs';
import { phase0 } from './normalize/_phase0.mjs';
import { phase1 } from './normalize/_phase1.mjs';
import { phase2 } from './normalize/_phase2.mjs';

export function preval({ entryPointFile, stdio, verbose, verboseTracing, resolve, req, stopAfterNormalize, refTracing, options = {} }) {
  if (stdio) setStdio(stdio, verbose);
  else clearStdio();
  setVerboseTracing(!!verbose && verboseTracing !== false);

  {
    const { logDir, logPasses, maxPass, cloneLimit, allowEval, unrollLimit, implicitThisIdent, unrollTrueLimit, refTest, ...rest } = options;
    if (JSON.stringify(rest) !== '{}') throw new Error('Preval: Unsupported options received:', rest);
  }

  if (verbose) {
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
        reports: [],
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
    lastAst: {todo: 'updateMe'},
  };

  const normalizeQueue = [entryPoint]; // Order is not relevant in this phase
  const allFileNames = [entryPoint]; // unordered but there's no point in a set

  let queueFileCounter = -1;
  while (normalizeQueue.length) {
    const nextFname = normalizeQueue.pop(); // Order should not matter for normalization purposes
    ++queueFileCounter;
    const mod = modules.get(nextFname);
    log('\nNext fname in queue: "' + nextFname + '"');

    // First normalize the code. Then serialize that AST. Then parse it again (because scope tracking).
    // Scope tracking by parser not looking so hot now, eh.
    const inputCode = req(nextFname);

    if (verboseTracing === undefined && inputCode.length > 10 * 1024) setVerboseTracing(false); // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.
    const preFdata = parseCode(inputCode, nextFname);

    options.onAfterFirstParse?.(preFdata);
    prepareNormalization(preFdata, resolve, req, true, {unrollTrueLimit: options.unrollTrueLimit}); // I want a phase1 because I want the scope tracking set up for normalizing bindings
    phaseNormalOnce(preFdata);
    const preCode = tmat(preFdata.tenkoOutput.ast, true);

    options.onAfterNormalizeOnce?.(preCode, preFdata, nextFname, queueFileCounter, options);

    const fdata = parseCode(preCode, nextFname);
    contents.lastAst = fdata.tenkoOutput.ast;
    prepareNormalization(fdata, resolve, req, false, {unrollTrueLimit: options.unrollTrueLimit}); // I want a phase1 because I want the scope tracking set up for normalizing bindings
    phaseNormalize(fdata, nextFname, { allowEval: options.allowEval });

    mod.children = new Set(fdata.imports.values());
    mod.fdata = fdata;
    mod.inputCode = inputCode;
    mod.preCode = preCode;
    mod.normalizedCode = tmat(fdata.tenkoOutput.ast, true);
    mod.specialCode = 'unused';
    mod.reports.push(...preFdata.reports, ...fdata.reports);

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
          reports: [],
        });

        normalizeQueue.push(rfname);
      }
    });
  }

  log();
  log(
    '############################################################################################################################################################################################################',
  );
  log(
    '############################################################################################################################################################################################################',
  );
  log(
    '############################################################################################################################################################################################################',
  );
  log(
    '############################################################################################################################################################################################################',
  );
  log(
    '######                                                                           ###########################################################################################################################',
  );
  log(
    '######      First phase complete. Discovered',
    modules.size,
    'imported files     ###########################################################################################################################',
  );
  log(
    '######                                                                           ###########################################################################################################################',
  );
  log(
    '############################################################################################################################################################################################################',
  );
  log(
    '############################################################################################################################################################################################################',
  );
  log(
    '############################################################################################################################################################################################################',
  );
  log(
    '############################################################################################################################################################################################################',
  );
  log();

  options.onFirstPassEnd?.(contents, allFileNames, options);

  group('Resolving correct import order of dependency tree (total ' + allFileNames.length + ' files)');
  // https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search
  const evalOrder = [];
  [...modules.keys()].forEach(function visit(n) {
    const mod = modules.get(n);
    vgroup('- visiting "' + n + '", mark = ' + mod.mark);
    if (mod.mark !== MARK_NONE) {
      vlog('  - Already marked, skipping');
      vgroupEnd();
      return;
    }
    if (mod.mark === MARK_TEMP) {
      vlog('  - marked temp');
      vgroupEnd();
      return;
    }
    if (mod.mark === MARK_PERM) {
      console.log('dependency cycle detected');
      console.log('module:');
      console.log({ ...mod, fdata: '<supressed>' });
      vgroupEnd();
      throw new Error('Preval: dependency cycle detected');
    }
    mod.mark = MARK_TEMP;
    vlog(' - imports from', mod.children.size);
    mod.children.forEach(visit);
    mod.mark = MARK_PERM;
    evalOrder.push(n);
    vgroupEnd();
  });
  if (VERBOSE_TRACING) {
    vlog();
    vlog('Proper eval order is:');
    vlog(evalOrder.map((fname) => ' - ' + fname).join('\n'));
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
      let phase1s = 0;
      const maxPasses = options.maxPass > 0 ? options.maxPass : 0;
      while (changed) {
        ++passes;
        const fdata = phase0(inputCode, fname);
        let firstAfterParse = true;
        do {
          // Slow; serialize and parse to verify each cycle
          //parseCode(tmat(fdata.tenkoOutput.ast, true), fname);

          //console.log(tmat(fdata.tenkoOutput.ast, true));
          ++phase1s;
          phase1(fdata, resolve, req, firstAfterParse, passes, phase1s, !firstAfterParse && options.refTest); // I want a phase1 because I want the scope tracking set up for normalizing bindings
          contents.lastPhase1Ast = fdata.tenkoOutput.ast;

          if (options.refTest) {
            // Test runner only cares about the first pass up to here
            break;
          }

          firstAfterParse = false;

          changed = phase2(program, fdata, resolve, req, {unrollLimit: options.unrollLimit, implicitThisIdent: options.implicitThisIdent, unrollTrueLimit: options.unrollTrueLimit});
        } while (changed === 'phase1');

        mod.fdata = fdata;
        mod.reports.push(...fdata.reports)

        let outCode;
        try {
          outCode = tmat(fdata.tenkoOutput.ast, true);
        } catch (e) {
          console.log('Printer threw up on AST, message:', e.message);
          options.onError?.('printer', e, fdata.tenkoOutput.ast, options);
          throw e;
        }

        options.onPassEnd?.(outCode, passes, fi, options);

        changed = outCode !== inputCode;
        if (changed && (!maxPasses || passes < maxPasses) && !options.refTest) {
          log('Something changed in phase2 so we will be rerolling it again');
          inputCode = outCode;
          log(
            '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          );

          vlog('\nCurrent state before restart\n--------------\n' + fmat(inputCode) + '\n--------------\n');

          const fdata = parseCode(inputCode, fname);
          prepareNormalization(fdata, resolve, req, false, {unrollTrueLimit: options.unrollTrueLimit}); // I want a phase1 because I want the scope tracking set up for normalizing bindings
          phaseNormalize(fdata, fname, { allowEval: options.allowEval });

          inputCode = tmat(fdata.tenkoOutput.ast, true);

          mod.reports.push(...fdata.reports)
          contents.lastAst = fdata.tenkoOutput.ast;
        } else {
          // Report the implicit globals. Tests should explicitly declare the implicit globals so we can automatically verify
          // that none are accidentally left behind / partially eliminated.
          // Catch vars are marked as implicit globals but obviously are not implicit globals so we exclude them.
          const implicitGlobals = new Set();
          fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
            if (meta.isImplicitGlobal && !meta.isCatchVar && !globals.has(name)) implicitGlobals.add(name);
          });
          contents.implicitGlobals = implicitGlobals;
          contents.explicitGlobals = new Set(Array.from(globals.keys()));
          contents.globallyUniqueNamingRegistry = fdata.globallyUniqueNamingRegistry;

          contents.files[fname] = outCode;
          options.onFinal?.(outCode, passes, fi, options);
        }

        if (changed && maxPasses && passes >= maxPasses) {
          log('Reached the max number of passes requested. Bailing even though there are changes to process.');
          break;
        }
        if (options.refTest) {
          log('This is a ref test. Stopping after first pass.');
        }
      }
      log('\nPreval ran for', passes, 'passes');
    });
  }

  log('Preval end');

  if (VERBOSE_TRACING) {
    // Conditional to prevent the fmat call here
    vlog('\nCurrent state, final\n--------------\n' + fmat(contents.files.intro) + '\n--------------\n');
  }

  const reports = [];
  modules.forEach( mod => reports.push(...mod.reports));
  if (reports.length) {
    log('Reports:\n' + reports.map(s => ' - ' + s + '\n') + '\n\n');
  }

  return contents;
}

export const helpers = {fmat, tmat};
