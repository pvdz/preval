import { setVerboseTracing, VERBOSE_TRACING, MARK_NONE, MARK_TEMP, MARK_PERM } from './constants.mjs';
import { clearStdio, setStdio, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, setRefTracing, setRiskyRules, registerTodoSink, } from './utils.mjs';
import globals from './globals.mjs';
import {setPrintVarTyping} from "../lib/printer.mjs";

import { parseCode } from './normalize/parse.mjs';
import { phaseNormalize } from './normalize/normalize.mjs';
import { phaseNormalOnce } from './normalize/normal_once.mjs';
import { prepareNormalization } from './normalize/prepare.mjs';
import { phase0 } from './normalize/phase0.mjs';
import { phase1 } from './normalize/phase1.mjs';
import { phase2 } from './normalize/phase2.mjs';
import { phase3 } from './normalize/phase3.mjs';
import { phase1_1 } from './normalize/phase1_1.mjs';
import { ASSERT } from './utils.mjs';
import { freeFuncs } from './reduce_static/free_funcs.mjs';
import { denorm } from './normalize/denorm.mjs';
import { astToPst } from './utils/ast_to_pst.mjs';

let rngSeed = 1;
function prng() {
  // Note: keep in sync with the test $prng func. We'll probably consolidate them later.
  // Super simple PRNG which we shove into Math.random for our eval tests
  // We use the same algo for inlining in preval so it ought to lead to the same outcome..? tbd if that holds (:
  // https://pvdz.ee/weblog/456
  ASSERT(rngSeed !== 0, 'do not call xorshift with zero');
  rngSeed = rngSeed ^ rngSeed << 13;
  rngSeed = rngSeed ^ rngSeed >> 17;
  rngSeed = rngSeed ^ rngSeed << 5;
  // Note: bitwise ops are 32bit in JS so we divide the result by the max 32bit number to get a number [0..1>
  return ((rngSeed >>> 0) % 0b1111111111111111) / 0b1111111111111111;
}

export function preval({ entryPointFile, stdio, verbose, verboseTracing, resolve, req, stopAfterNormalize, refTracing, options = {} }) {
  if (stdio) setStdio(stdio, verbose);
  else clearStdio();
  setVerboseTracing(!!verbose && verboseTracing !== false);
  setRiskyRules(!!(options.risky ?? true));

  {
    const {
      logDir, logPasses, logPhases, logFrom, maxPass, cloneLimit, allowEval, unrollLimit,
      implicitThisIdent, refTest, pcodeTest, risky, prngSeed,
      ...rest
    } = options;
    if (JSON.stringify(rest) !== '{}') throw new Error(`Preval: Unsupported options received: ${JSON.stringify(rest)}`);
  }

  if (verbose) {
    console.log('Preval options:');
    console.log(options);
  }

  if (options.prngSeed) rngSeed = options.prngSeed;
  if (options.onTodo) registerTodoSink(options.onTodo);

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
        denormCode: '',
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
    // After the first pass for one-time transforms
    pre: {},
    // For debug/testing
    normalized: {},
    // TODO: this is "final output" after phase3. Rename it to `settled` and other usages of "output" that currently mean this as well.
    files: {},
    // After running denorm() on the final phase state
    denormed: {},
    // Was used for discovering code that wasn't normalized. Currently unused.
    special: {},
    // Compiled function data per file, Record<fname, Map<pid, {name:string, pcode}>
    pcodeData: {},
    // This is the PST converted from the AST as it was after Preval settled (but before denorm)
    settledPst: {todo: 'updateMe'},
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
    if (typeof inputCode !== 'string') throw new Error('Input code was not a string. Check your input .');

    if (verboseTracing === undefined && inputCode.length > 10 * 1024) setVerboseTracing(false); // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.
    const preFdata = parseCode(inputCode, nextFname);

    options.onAfterFirstParse?.(preFdata);
    prepareNormalization(preFdata, resolve, req, true, {unrollLimit: options.unrollLimit}); // I want a phase1 because I want the scope tracking set up for normalizing bindings
    phaseNormalOnce(preFdata);
    const preCode = tmat(preFdata.tenkoOutput.ast, true);

    options.onAfterNormalizeOnce?.(preCode, preFdata, nextFname, queueFileCounter, options);

    const fdata = parseCode(preCode, nextFname);
    prepareNormalization(fdata, resolve, req, false, {unrollLimit: options.unrollLimit}); // I want a phase1 because I want the scope tracking set up for normalizing bindings
    phaseNormalize(fdata, nextFname, prng, { allowEval: options.allowEval, prngSeed: options.prngSeed });

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

    options.onAfterNormalize?.(fdata, 0, queueFileCounter, options, contents);

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
          denormCode: '',
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
    'imported files                    ###########################################################################################################################',
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
        let phaseLoop = 0;
        options?.onAfterPhase?.(0, passes, phaseLoop, fdata, false, options);
        do {
          phaseLoop += 1;
          // Slow; serialize and parse to verify each cycle
          //parseCode(tmat(fdata.tenkoOutput.ast, true), fname);

          // Phase 1 does mostly noop analysis to reset information that may have gone stale after each transform
          ++phase1s;
          phase1(fdata, resolve, req, firstAfterParse, passes, phase1s, !firstAfterParse && options.refTest, !firstAfterParse && options.pcodeTest, verboseTracing);
          phase1_1(fdata, resolve, req, firstAfterParse, passes, phase1s, !firstAfterParse && options.refTest, !firstAfterParse && options.pcodeTest, verboseTracing);
          // In a pcode test we have to run the pcode plugin here because we don't want ot run all of phase2
          if (options.pcodeTest) freeFuncs(fdata, prng, !!options.prngSeed);
          contents.lastPhase1Ast = fdata.tenkoOutput.ast;

          options?.onAfterPhase?.(1, passes, phaseLoop, fdata, false, options);

          if (options.refTest || options.pcodeTest) {
            // For refTest, the test runner only cares about the first pass up to here
            // For pcodeTest, the test will be based on the AST after phase1 (with meta data)
            break;
          }

          firstAfterParse = false;

          changed = phase2(program, fdata, resolve, req, passes, phase1s, verboseTracing, prng, {implicitThisIdent: options.implicitThisIdent, prngSeed: rngSeed});
          options?.onAfterPhase?.(2, passes, phaseLoop, fdata, changed, options);
          if (!changed) {
            // Force a normalize pass before moving to phase3. Loop if it changed anything anyways.
            changed = phaseNormalize(fdata, fname, prng,  { allowEval: options.allowEval, prngSeed: options.prngSeed });
            options.onAfterPhase?.(2.1, passes, phaseLoop, fdata, false, options, fi);
            if (changed) vlog('The pre-phase3 normal did change something! starting from phase0');
          }
          if (!changed) {
            changed = phase3(program, fdata, resolve, req, {unrollLimit: options.unrollLimit});
            options?.onAfterPhase?.(3, passes, phaseLoop, fdata, changed, options);
          }
        } while (changed?.next === 'phase1');

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

        contents.pcodeData[fname] = fdata.pcodeOutput;

        options.onPassEnd?.(outCode, passes, fi, options, contents);

        changed = outCode !== inputCode;
        if (changed && (!maxPasses || passes < maxPasses) && !options.refTest) {
          log('Something changed in phase2 or phase3 so we will be rerolling it again');
          inputCode = outCode;
          log(
            '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          );

          vlog('\nCurrent state before restart\n--------------\n' + fmat(inputCode) + '\n--------------\n');

          const fdata = parseCode(inputCode, fname);
          prepareNormalization(fdata, resolve, req, false, {unrollLimit: options.unrollLimit}); // I want a phase1 because I want the scope tracking set up for normalizing bindings
          phaseNormalize(fdata, fname, prng, { allowEval: options.allowEval, prngSeed: options.prngSeed });

          options.onAfterNormalize?.(fdata, passes + 1, fi, options, contents);

          inputCode = tmat(fdata.tenkoOutput.ast, true);

          mod.reports.push(...fdata.reports)
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

          let testOutputCode;
          try {
            setPrintVarTyping(true, fdata); // Handy typing details
            testOutputCode = tmat(fdata.tenkoOutput.ast, true);
            setPrintVarTyping(false); // Handy typing details
          } catch (e) {
            console.log('Printer threw up on AST, message:', e.message);
            options.onError?.('printer', e, fdata.tenkoOutput.ast, options);
            throw e;
          }

          contents.files[fname] = testOutputCode;
          options.onFinal?.(testOutputCode, passes, fi, options);
        }

        if (changed && maxPasses && passes >= maxPasses) {
          log('Reached the max number of passes requested. Bailing even though there are changes to process.');
          break;
        }
        if (options.refTest) {
          log('This is a ref test. Stopping after first pass.');
        }
      }

      try {
        // Create PST before denormalizing it because PST only works (safely) on normalized code
        contents.settledPst = astToPst(mod.fdata.tenkoOutput.ast);
      } catch (e) {
        console.error('AST to PST conversion failed:', e);
        contents.settledPst = {failure: true, e};
      }

      if (!options.refTest && !options.pcodeTest) {
        const fdata = mod.fdata;
        ASSERT(fdata, 'The fdata object should be guaranteed to be created...');

        let limit = 1000;
        while (denorm(fdata, resolve, req, {})) if (--limit <= 0) break;
        mod.denormCode = tmat(fdata.tenkoOutput.ast, true);
        contents.denormed[fname] = mod.denormCode;
        options?.onAfterPhase?.(-1, 999, 0, fdata, false, options);
        options?.onAfterDenorm?.(fdata, options);
      }

      log('\nPreval ran for', passes, 'passes');
    });
  }

  log('Preval end');

  if (VERBOSE_TRACING) {
    // Conditional to prevent the fmat call here
    const result = fmat(tmat(modules.get('intro').fdata.tenkoOutput.ast));
    vlog('\nCurrent state, final\n--------------\n' + result.slice(0, 1000) + (result.length > 1000 ? '   ... <snip>' : '') + '\n--------------\n');
  }

  const reports = [];
  modules.forEach( mod => reports.push(...mod.reports));
  if (reports.length) {
    log('Reports:\n' + reports.map(s => ' - ' + s + '\n') + '\n\n');
  }

  return contents;
}

export const helpers = {fmat, tmat};
