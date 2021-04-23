// Look at functions that end with if-else, where both branches explicitly return,
// and if they both basically return a function call, check if the call is equal.
// If it matches, drop the if-else and replace it with only one branch. This might also collapse more stuff.

// This is a case that apparently ends up happening a lot. Maybe just as an artifact of the transforms.
// But it helps on Tenko at least. Cut 200k from 3.2m result. Let's hope it's not too input biased :)


import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function dedupeBranchedReturns(fdata) {
  group('\n\n\nDetecting branched returns that return the same call\n');
  const r = _dedupeBranchedReturns(fdata);
  groupEnd();
  return r;
}
function _dedupeBranchedReturns(fdata) {
  let deduped = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    vlog(
      '- `' + name + '`:',
      meta.constValueRef.node.type,
      'reads `arguments` len/any?',
      meta.constValueRef.node.$p.readsArgumentsLen,
      meta.constValueRef.node.$p.readsArgumentsAny,
    );

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') {
      vlog('  - Not a function');
      return;
    }

    const lastNode = funcNode.body.body[funcNode.body.body.length - 1];
    if (lastNode.type !== 'IfStatement') {
      vlog('  - Last element not if-else');
      return;
    }

    if (!lastNode.alternate) {
      vlog('  - The if did not have an else');
      return;
    }

    if (lastNode.consequent.body.length !== 2 || lastNode.alternate.body.length !== 2) {
      vlog('  - At least one branch does not have two elements');
      return;
    }

    const ifVar = lastNode.consequent.body[0];
    const elseVar = lastNode.alternate.body[0];

    if (ifVar.type !== 'VariableDeclaration' || elseVar.type !== 'VariableDeclaration') {
      vlog('  - At least oen branch did not start with a var decl');
      return;
    }

    const ifRet = lastNode.consequent.body[1];
    const elseRet = lastNode.alternate.body[1];

    if (ifRet.type !== 'ReturnStatement' || elseRet.type !== 'ReturnStatement') {
      vlog('  - At least oen branch did not end with a return');
      return;
    }

    const ifCall = ifVar.declarations[0].init;
    const elseCall = elseVar.declarations[0].init;

    if (ifCall.type !== 'CallExpression' || elseCall.type !== 'CallExpression') {
      vlog('  - At least one branch was not "just" returning a call');
      return;
    }

    if (ifCall.callee.type !== 'Identifier' || elseCall.callee.type !== 'Identifier') {
      // TODO: support members as well
      vlog('  - The callee of at least one branch was not an ident');
      return;
    }

    if (ifCall.callee.name !== elseCall.callee.name) {
      // TODO: support members as well
      vlog('  - Both branches did not call the same ident');
      return;
    }

    if (ifRet.argument.type !== 'Identifier' || elseRet.argument.type !== 'Identifier') {
      vlog('  - At least one branch did not return an identifier, so it did not return the call result');
      return;
    }

    if (ifRet.argument.name !== ifVar.declarations[0].id.name || elseRet.argument.name !== elseVar.declarations[0].id.name) {
      vlog('  - At least one branch did not actually return the result of the call');
      return;
    }

    // Ok so far we've verified that the function ends with an if-else. Both branches of the if-else contain exactly
    // one var decl that has a call as init, and a return that returns this var decl. They both call the same function.

    const ifArgs = ifCall.arguments;
    const elseArgs = elseCall.arguments;

    // Verify that all arguments are equal. The call must be normalized, so all args are idents, literals, or negative numbers.
    // If one has more args than the other, assume `undefined` for the sake of comparison. Other rules will enforce this.
    const max = Math.max(ifCall.arguments.length, elseCall.arguments.length);
    let match = true; // If no args, then call is equal
    for (let i=0; i<max; ++i) {
      const a = ifArgs[i] || AST.identifier('undefined');
      const b = elseArgs[i] || AST.identifier('undefined');

      if (a.type !== b.type) {
        vlog('  - Argument type at index', i, 'does not match');
        match = false;
        break;
      }
      if (a.type === 'Identifier') {
        if (a.name !== b.name) {
          vlog('  - Name of arg at index', i, 'does not match');
          match = false;
          break;
        }
      } else if (a.type === 'Literal') {
        // Checking .raw also catches the null case properly. And probably everything tbh. So whatever.
        // It should even be fine for references like regex, since they'd be fresh either way.
        // (Though normalized calls would not have regexes in their call args, so it's a moot point)
        if (a.raw !== b.raw) {
          vlog('  - Value of arg at index', i, 'does not match');
          match = false;
          break;
        }
      } else if (a.type === 'UnaryExpression' &&
        a.argument.type === 'Literal' && typeof a.argument.value === 'number' &&
        b.argument.type === 'Literal' && typeof b.argument.value === 'number'
      ) {
        if (
        a.argument.value !== b.argument.value

        ) {
          vlog('  - Negative value of arg at index', i, 'does not match');
          match = false;
        break;
        }
      } else {
        // This branch just means the normalized call contained a node that I did not expect in normalized form.
        ASSERT(false, 'support this kind of node...');
      }
    }

    if (!match) {
      // At least one arg did not match. Already traced out.
      return;
    }

    vlog('It appears that the function ends with if-else and in both branches returns the value of calling the same function with the same arguments. Should be able to fold this up.');
    // Considering that the rule only applies to the last node of a function, and that we explicitly checked the
    // structure of the if-else; we should be able to safely replace the if-else without worrying about dirty state.

    rule('Last statement of a function that returns the exact same func call should be merged');
    example('function f(x) { if (x) { const t1 = g(a, b, c); return t1; } else { const t2 = g(a, b, c); return t2; }',
      'function f(x) { const t1 = g(a, b, c); return t1; }'
      );
    before(lastNode, funcNode);

    funcNode.body.body.pop();
    funcNode.body.body.push(
      ifVar,
      ifRet
    );

    after(ifVar);
    after(ifRet, funcNode);

    ++deduped;
  });

  if (deduped) {
    log('Deduped branching trampolines:', deduped, '. Restarting from phase1');
    return 'phase1';
  }

  log('Deduped branching trampolines: 0.');
}
