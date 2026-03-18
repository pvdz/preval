// Find stealer bindings (booly that are updated once like a "lazy init") that pair with a sealer booly with actual value
//
//    `let x = false; let y = undef; if (!x) { x = true; y = {}; }`
// ->
//    `let y = undef; if (!y) { y = {}; }`
//

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
  currentState,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifSealerProxy(fdata) {
  // currentState(fdata, 'ifSealerProxy', true, fdata);

  group('\n\n\n[ifSealerProxy] Looking for proxy sealer bools to replace with a booly they proxy\n');
  const r = _ifSealerProxy(fdata);
  groupEnd();

  // currentState(fdata, 'ifSealerProxy', true, fdata);

  return r;
}
function _ifSealerProxy(fdata) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, ifTestSealerName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return; // Must get updated
    if (meta.isBuiltin) return;
    if (!meta.varDeclRef) return; // catch
    if (!meta.reads.length) return; // dead
    if (meta.typing.mustBeType !== 'boolean') return;
    if (meta.writes.length !== 2) return; // Sealers have an init and an assign (seal)
    if (meta.reads.length !== 1) return; // Our target is only read once
    const ifNode = meta.reads[0].parentNode;
    if (ifNode.type !== 'IfStatement' || meta.reads[0].parentProp !== 'test') return; // As an if-test.
    const write0 = meta.writes[0];
    const write1 = meta.writes[1];
    if (write0.kind === 'assign' && (write0.blockBody === ifNode.consequent.body || write0.blockBody === ifNode.alternate.body)) ; // ok
    else if (write1.kind === 'assign' && (write1.blockBody === ifNode.consequent.body || write1.blockBody === ifNode.alternate.body)) ; // ok
    else return; // The seal was not inside the if that tested the seal; not our pattern

    vgroup('- Boolean if-test found: `' + ifTestSealerName + '`, now check if proxy');

    process(meta, ifTestSealerName);

    vgroupEnd();
  });

  function process(meta, ifTestSealerName) {
    // Now we need to confirm that either branch updates itself to the opposite boolean and some other variables in
    // that same branch. Then find one that is also a booly sealer and confirm that it is sealed before the tester
    // (or that it can't realistically fail before sealing the proxy). That will be the one being proxied.

    // To reduce the potential edge case problem space we'll require that the sealer needs to be sealed inside the
    // toplevel of one of the two branches.

    // Silly but make sure it's writing two different bools
    // Note: mustBeType=boolean can still allow a binary expression with boolean outcome
    const a = meta.writes[0].kind === 'var' ? meta.writes[0].parentNode.init : meta.writes[0].parentNode.right;
    if (!AST.isPrimitive(a)) return vlog('- bail: first write is not a boolean lit');
    const b = meta.writes[1].kind === 'var' ? meta.writes[1].parentNode.init : meta.writes[1].parentNode.right;
    if (!AST.isPrimitive(b)) return vlog('- bail: second write is not a boolean lit');
    const av = AST.getPrimitiveValue(a);
    const bv = AST.getPrimitiveValue(b);
    if (av === bv) return vlog('- bail: init/assign is same bool');

    const read = meta.reads[0];
    const assignWrite = meta.writes[1].kind === 'assign' ? meta.writes[1] : meta.writes[0];

    const branch = assignWrite.blockBody;

    // Now confirm the assign is in the toplevel of a branch of the read's if.
    if (
      read.parentNode.consequent === branch ||
      read.parentNode.alternate === branch
    ) return vlog('- bail: assign is not in toplevel branch of the if of the test');

    const initialProxyState = meta.writes[0].kind === 'var' ? av : bv;

    // Okay so this is probably a sealer. We don't know for sure until we verify that there's no branching, no early
    // returns (and preferably no possible throws) before the assign executes.
    for (let i=0; i<branch.length; ++i) {
      if (branch[i].type !== 'ExpressionStatement') return vlog('- bail: found non-expr before seal');
      if (branch[i].expression.type !== 'AssignmentExpression') return vlog('- bail: found non-assign before seal'); // Or maybe allow var? others?
      if (branch[i].expression.left.type !== 'Identifier') return vlog('- bail: was not assign to ident'); // Member
      if (branch[i].expression.right.type !== 'Identifier' && !AST.isPrimitive(branch[i].expression.right)) return vlog('- bail: assigned value was not a primitive or ident');

      // Confirm if this is a booly and that the read comes after this if-statement yet nested in the parent block
      // (This guarantees that IF the read is evaluated, the value must be sealed at that point)
      const lhsName = branch[i].expression.left.name;
      vlog('- Considering whether', [lhsName], 'is a proxied booly');
      if (lhsName === ifTestSealerName) {
        vlog('- skipping the sealer itself, of course');
        continue;
      }
      const lhsMeta = fdata.globallyUniqueNamingRegistry.get(lhsName);
      vlog('reads', lhsMeta.reads.length, ', writes', lhsMeta.writes.length, 'is write?', lhsMeta.writes[1].node === branch[i].expression.left);
      if (
        lhsMeta.writes.length === 2 &&
        lhsMeta.writes[1].node === branch[i].expression.left // This must be the second write
      ) {
        vlog('Initial check passed...');
        // Must now confirm that the initial value has the same booly value and that the update here has the opposite booly value
        const initialRhs = lhsMeta.writes[0].parentNode.init;
        const assignRhs = branch[i].expression.right;

        let initialBoolyState;
        if (AST.isPrimitive(initialRhs)) {
          initialBoolyState = !!AST.getPrimitiveValue(initialRhs);
        } else if (['FunctionExpression', 'ArrayExpression', 'ObjectExpression'].includes(initialRhs.type)) {
          initialBoolyState = true;
        } else if (initialRhs.type === 'Identifier') {
          const imeta = fdata.globallyUniqueNamingRegistry.get(initialRhs.name);
          if (imeta.typing.mustBeTruthy) initialBoolyState = true;
          else if (imeta.typing.mustBeFalsy) initialBoolyState = false;
          else {
            vlog('bail: Cant use this because the init is assigned an ident without known truthy or falsy value;', initialRhs.name);
          }
        } else {
          vlog('bail: Cant use this because we cant (easily) determine the initial booly state', initialRhs.type);
          continue;
        }

        let assignedBoolyState;
        if (AST.isPrimitive(assignRhs)) {
          assignedBoolyState = !!AST.getPrimitiveValue(assignRhs);
        } else if (['FunctionExpression', 'ArrayExpression', 'ObjectExpression'].includes(assignRhs.type)) {
          assignedBoolyState = true;
        } else if (assignRhs.type === 'Identifier') {
          const imeta = fdata.globallyUniqueNamingRegistry.get(assignRhs.name);
          if (imeta.typing.mustBeTruthy) assignedBoolyState = true;
          else if (imeta.typing.mustBeFalsy) assignedBoolyState = false;
          else {
            vlog('bail: Cant use this because the init is assigned an ident without known truthy or falsy value;', assignRhs.name);
          }
        } else {
          vlog('bail: Cant use this because we cant (easily) determine the updated booly state', assignRhs.type);
          continue;
        }

        if (initialBoolyState === assignedBoolyState) {
          vlog('bail: initial and assigned booly states are same');
          continue;
        }

        // Okay so we have a bool that is sealed inside the if-test that checks its state.
        // And we have another booly variable that is also sealed inside that same if.
        // I think we should be able to replace the bool, which is just a proxy, with the booly now.

        const ifNode = meta.reads[0].parentNode;

        rule('A sealer bool that proxies a sealer booly can be eliminated');
        example('let x = false; let y = undefined; if (!x) { x = true; y = {}; }', 'let y = undefined; if (!y) { y = {}; }');
        before(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
        before(lhsMeta.writes[0].blockBody[lhsMeta.writes[0].blockIndex]);
        before(meta.reads[0].blockBody[meta.reads[0].blockIndex]); // The if

        // We need to make sure the booly logic stays correct.
        // If the sealer starts as truthy before and the proxied as truthy then we can just replace it
        // If the sealer starts as truthy before and the proxied as falsy then we have to swap branches
        // Reverse if the sealer starts as false.

        ifNode.test = AST.identifier(lhsName);
        if (initialProxyState !== !!initialBoolyState) {
          // We must swap branches
          const tmp = ifNode.alternate;
          ifNode.alternate = ifNode.consequent;
          ifNode.consequent = tmp;
        }
        // We can immediately clean up since we know the bool is not used at all anymore
        // Another rule can also do this but I don't think there's any harm in doing that work now.
        meta.writes[0].blockBody[meta.writes[0].blockIndex] = AST.emptyStatement();
        meta.writes[1].blockBody[meta.writes[1].blockIndex] = AST.emptyStatement();

        after(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
        after(lhsMeta.writes[0].blockBody[lhsMeta.writes[0].blockIndex]);
        after(meta.reads[0].blockBody[meta.reads[0].blockIndex]); // The if

        changes += 1;
        return;

      }

      vlog('- this ident was not a sealer:', lhsName);

      // Okay this should be a safe statement that doesn't block the sealer, TDZ errors notwithstanding.
    }

    vlog('bail: found no eligible booly target in this if-statement to replace this sealer');
  }

  if (changes > 0) {
    log('Proxy sealer bools replaced:', ifSealerProxy, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'ifSealerProxy', changes, next: 'phase1'};
  }

  log('Proxy sealer bools replaced: 0.');
}
