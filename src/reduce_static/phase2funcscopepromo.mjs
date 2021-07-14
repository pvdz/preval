// Attempt to "promote" functions by moving them up one block, step by step

import walk from '../../lib/walk.mjs';
import { ALIAS_PREFIX } from '../constants.mjs';
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  tmat,
  fmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffsetExpensiveMaybe,
} from '../utils.mjs';
import { getIdentUsageKind } from '../bindings.mjs';

// - For each function
//   - Walk the entire body
//   - Collect all references to bindings
//   - Filter any ref for bindings that are local to the function (or its children)
//   - Discover all bindings that are local to the current parent block (BlockStatement or function etc)
//     - If there are no such bindings promote the function one level up
//     - Repeat the last two steps while promotion happened
// - Repeat while any promotion happened

// What's cheaper? Always tracking the referenced idents in phase1 (regardless of whether it's used) and having
// to maintain these references if we change something in this step? Or doing a quick walk through the function
// (and any nested functions...) to find all referenced idents? The walk is expensive but having to either fix
// up the collection or re-running phase1 for the same reason is also expensive.

export function funcScopePromo(fdata) {
  group('\n\n\nPromoting functions to an upper scope when possible\n');
  const r = _funcScopePromo(fdata);
  groupEnd();
  return r;
}
function _funcScopePromo(fdata) {
  const ast = fdata.tenkoOutput.ast;

  const queue = [];
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    // TODO: function may be inside a block in global
    if (meta.bfuncNode.type === 'Program') return; // Already global

    oneFunc(meta, name, queue);
  });

  if (queue.length) {
    // We don't track the index so we must search for the vardecl in its current parent every step
    // This should not be a big big deal. Hopefully.
    // It does mean that order is not important and we can just replace at will here.

    vlog('Now promoting the functions by removing them from their old parent and injecting them into their new parent');
    queue.forEach(
      ({
        varDecl, // A VariableDeclaration node (by reference, as it appears in the AST right now)
        from, // A BlockStatement.body array
        to, // A BlockStatement.body array
        toPid,
      }) => {
        vlog('Moving', varDecl.$p.pid, 'to', toPid);
        const pos = from.indexOf(varDecl);
        ASSERT(pos >= 0, 'var decl must be part of this parent');
        from.splice(pos, 1);
        let bodyOffset = findBodyOffsetExpensiveMaybe(to);
        if (bodyOffset < 0) bodyOffset = 0;
        to.splice(bodyOffset, 0, varDecl);
      },
    );

    //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');

    log('Promoted functions:', queue.length, '. Restarting from phase1 to fix up read/write registry');

    return 'phase1';
  }
  log('Promoted functions: 0.');
}

function oneFunc(meta, funcName, queue) {
  vgroup('- `' + meta.uniqueName + '`:', meta.constValueRef.node.type);
  const r = _oneFunc(meta, funcName, queue);
  vgroupEnd();
  return r;
}

function _oneFunc(meta, funcName, queue) {
  const funcNode = meta.constValueRef.node;
  if (funcNode?.type !== 'FunctionExpression') {
    vlog('Not a function');
    return;
  }
  vlog('Func pid is', funcNode.$p.pid, '(body pid is', funcNode.body.$p.pid, ', blockchain is', funcNode.$p.blockChain, ')');

  vgroup('Step 1: find all bindings that are local to this function and all referenced idents inside this function');
  const closures = findClosureRefs(funcNode);

  // Remove its own name. If we move this function, we also move this name, so recursive functions should not be punished here.
  vlog('Closure refs found:', [...new Set(closures)]);
  if (closures.has(funcName)) {
    vlog('Ignoring own name `' + funcName + '`');
    closures.delete(funcName);
  }
  vgroupEnd();

  // TODO: I don't like how we need to find the first promo parent ;( Too convoluted.
  const write = meta.writes.find((write) => write.kind === 'var');
  ASSERT(write, 'there should be such write', meta);
  const varDecl = write.blockBody[write.blockIndex];
  // For every step of the loop, which node do we consider its "current" parent? Starts with the real parent.
  const initialParentNode = varDecl.$p.promoParent;
  let currentParentNode = initialParentNode;
  // What is the parent that we intend to promote to? Either a Block node or Program
  let currentPromoParent = varDecl.$p.promoParent;
  let i = 0;
  while (currentParentNode.type !== 'Program') {
    vgroup('Loop start');

    vgroup('Step 2.' + ++i + ': find all local bindings to the current parent node of the function binding');
    vlog('Current parent node pid:', currentParentNode.$p.pid, ', current promo pid:', currentPromoParent.$p.pid);
    const parentBindings = findLocalBindings(currentParentNode, funcName);
    vlog('The current parent node has these bindings:', parentBindings);
    vgroupEnd();

    vlog('Step 3.' + i + ': Check whether the function refers to any of the parent bindings');
    // We have to do a union of the two sets. I think it's more likely for the set of parentBindings
    // to be smaller than the set of referenced bindings so we check that way.
    if (parentBindings.some((pname) => closures.has(pname))) {
      vlog('- At least one reference in', closures, 'referenced a closure of', parentBindings, ', so we can not promote further');
      vgroupEnd();
      break;
    }
    vlog('- We should be able to promote. No closure ref found on this level.');

    currentParentNode = currentPromoParent;
    currentPromoParent = currentPromoParent.$p.promoParent;
    if (currentParentNode.type === 'Program') {
      vlog('- Promoting to global root...');
    }

    vgroupEnd();
  }

  if (currentParentNode === initialParentNode) {
    vlog('Unable to promote. Bailing');
    return;
  }

  vlog('Queuing', varDecl.$p.pid, 'for promotion from', write.parentNode.$p.pid, 'to', currentParentNode.$p.pid);
  queue.push({
    varDecl,
    from: write.blockBody,
    to: currentParentNode.body,
    toPid: currentParentNode.$p.pid,
  });

  return true;
}

function findClosureRefs(funcNode) {
  // List of references and the blockReference stack. We need this to distinguish a local from a closure ref.
  const referenced = [];

  // For each block level (includes funcs), track which names were bound. After the entire walk, we use these
  // sets to determine whether the ref was local or a closure.
  // TODO: I think we can simplify this to a single flat set considering our normalization rules. Local binding names should be unique and not the same as a discovered global binding. After that we should trust that if a local name is referenced, that the name must target that local binding and not a global binding.
  const blockReferences = [];

  vlog('Walking...');
  walk(_funcWalker, funcNode, 'body');
  function _funcWalker(node, before, nodeType, path) {
    const key = nodeType + ':' + (before ? 'before' : 'after');
    switch (key) {
      case 'BlockStatement:before': {
        blockReferences.push(new Set());
        break;
      }
      case 'BlockStatement:after': {
        blockReferences.pop();
        break;
      }
      case 'VariableDeclarator:before': {
        const name = node.id.name;
        vlog('Marking `' + name + '` as a local binding');
        blockReferences[blockReferences.length - 1].add(name);
        break;
      }
      case 'Identifier:before': {
        const name = node.name;
        if (name !== 'arguments') {
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const kind = getIdentUsageKind(parentNode, parentProp);
          if (kind === 'read' || kind === 'write') {
            vlog('Referenced `' + name + '` in a ' + kind);
            // We can not know yet whether this name was bound locally or not until we complete visiting
            // the entire body since the decl may appear later than the read.
            // So slice the current stack of blockReferences and traverse them afterwards for validation.
            referenced.push([name, blockReferences.slice(0)]);
          }
        }
        break;
      }
    }
  }

  vlog('Verifying local from closure...');
  // "A reference is a closure when `not one` of the parent blocks contained a var decl for this name"
  const closures = new Set();
  referenced.forEach(([name, chain]) => {
    if (closures.has(name)) return; // It's likely a closure is referenced multiple times
    if (!chain.some((set) => set.has(name))) {
      closures.add(name);
    }
  });

  return closures;
}

function findLocalBindings(currentParentNode, funcName) {
  // Walk the parent, collecting all bindings, but do not visit functions
  const parentBindings = [];
  vlog('Looking for all bindings in the lexical parent node');
  walk(_parentWalker, currentParentNode, 'body');
  function _parentWalker(node, before, nodeType, path) {
    const key = nodeType + ':' + (before ? 'before' : 'after');
    switch (key) {
      case 'FunctionExpression:before': {
        return true; // Do not traverse
      }
      case 'VariableDeclarator:before': {
        const name = node.id.name;
        vlog('Found `' + name + '` in parent lex scope');
        if (name === funcName) {
          vlog('- Ignoring own function name since we would move that together with the function');
        } else {
          parentBindings.push(name);
        }
      }
    }
  }

  return parentBindings;
}
