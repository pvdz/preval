import { clearStdio, setStdio, log, tmat, fmat, group, groupEnd } from './utils.mjs';
import { phase0 } from './phase0.mjs';
import { phaseNormalize } from './normalize.mjs';
import { phase1 } from './phase1.mjs';
import { phase2 } from './phase2.mjs';
import { phase3 } from './phase3.mjs';
import { phase4 } from './phase4.mjs';

const MARK_NONE = 0;
const MARK_TEMP = 1;
const MARK_PERM = 2;

export function preval({ entryPointFile, stdio, verbose, resolve, req, stopAfterNormalize }) {
  if (stdio) setStdio(stdio, verbose);
  else clearStdio();

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
  };

  const contents = {
    // note: test runner will auto-Prettier the result. Perhaps this should be done here..? Or let the user take care of that?
    // TODO: this is "final output". Rename it.
    files: {},
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
    const fdata = phase0(inputCode, nextFname);
    phase1(fdata, resolve, req, verbose); // I want a phase1 because I want the scope tracking set up for normalizing bindings
    phaseNormalize(fdata, nextFname);

    mod.children = new Set(fdata.imports.values());
    mod.fdata = fdata;
    mod.inputCode = inputCode;
    mod.normalizedCode = tmat(fdata.tenkoOutput.ast, true);
    mod.specialCode = 'unused';

    contents.normalized[nextFname] = mod.normalizedCode;
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
          specialCode: '',
          outputCode: '',
          fdata: undefined,
        });

        normalizeQueue.push(rfname);
      }
    });
  }

  log();
  log('##################################');
  log('##################################');
  log('##');
  log('## First phase complete. Discovered', modules.size, 'imported files');
  log('##');
  log('##################################');
  log('##################################');
  log();

  group('Resolving correct import order of dependency tree (total ' + allFileNames.length + ' files)');
  // https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search
  const evalOrder = [];
  [...modules.keys()].forEach(function visit(n) {
    const mod = modules.get(n);
    group('- visiting "' + n + '", mark = ' + mod.mark);
    if (mod.mark !== MARK_NONE) {
      log('  - Already marked, skipping');
      return;
    }
    if (mod.mark === MARK_TEMP) {
      log('  - marked temp');
      groupEnd();
      return;
    }
    if (mod.mark === MARK_PERM) {
      console.log('dependency cycle detected');
      console.log('module:');
      console.log({ ...mod, fdata: '<supressed>' });
      groupEnd();
      throw new Error('Preval: dependency cycle detected');
    }
    mod.mark = MARK_TEMP;
    log(' - imports from', mod.children.size);
    mod.children.forEach(visit);
    mod.mark = MARK_PERM;
    evalOrder.push(n);
    groupEnd();
  });
  if (evalOrder.length < 10) {
    log();
    log('Proper eval order is:');
    log(evalOrder.map((fname) => ' - ' + fname).join('\n'));
  }
  program.evalOrder = evalOrder;

  // Temporarily disable the second phase
  evalOrder.forEach((fname) => {
    contents.files[fname] = '"<skipped>"';
  });
  if (!stopAfterNormalize && false) {
    // Traverse the dependency tree, bottom to top
    evalOrder.forEach((fname) => {
      const mod = modules.get(fname);
      const inputCode = mod.normalizedCode;
      const fdata = phase0(inputCode, fname);
      phase1(fdata, resolve, req, verbose); // I want a phase1 because I want the scope tracking set up for normalizing bindings

      let changed = false;
      do {
        ++fdata.cycle;
        changed = phase2(program, fdata, resolve, req);
        changed = phase3(program, fdata, resolve, req) || changed;
        changed = phase4(program, fdata, resolve, req) || changed;
      } while (changed);

      mod.fdata = fdata;

      contents.files[fname] = tmat(fdata.tenkoOutput.ast, true);
    });
  }

  return contents;
}
