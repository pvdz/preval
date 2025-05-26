// When a var is used in an if-test, initialized by another var that is used as an if-test before
// the other if-node, and updated such that we can infer the truthy value of the second if-test,
// then we should fold up the second if-node according to the presumed value of the if-test.
//
//
//        let a = x; if (x) {} else a = true; if (a) A; else B;
// ->
//        let a = x; if (x) {} else a = true; A;
//
//
//        let a = !x; if (x) a = true; else {} if (a) A; else B;
// ->
//        let a = !x; if (x) a = true; else {} A;
//
//
// In both cases, a is always truthy so we can simplify the second if-node to just the consequent branch.
// Works the same with falsy. Supports various cases.
//

import { after, before, currentState, example, group, groupEnd, log, rule, vlog } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';
import { setPrintPids } from '../../lib/printer.mjs';

export function ifFoldTernaryConst(fdata) {
  group('\n\n\n[ifFoldTernaryConst] Attempting to fold if statements based on ternary consts initialized with negation (registry walk v11)');
  currentState(fdata, 'ifFoldTernaryConst', true, fdata);

  // setPrintPids(true);
  // currentState(fdata, 'ifFoldTernaryConst', true, fdata);
  // setPrintPids(false);

  const r = _ifFoldTernaryConst(fdata);
  groupEnd();
  return r;
}

function _ifFoldTernaryConst(fdata) {
  let changes = 0;

  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isCatchVar) return;
    if (meta.reads.length === 0 || meta.writes.length === 0) return;

    if (meta.writes.length === 0 || meta.writes[0].kind !== 'var') return;
    const varDeclWrite = meta.writes[0];
    const varDeclBlock = varDeclWrite.blockBody;
    const varDeclIndex = varDeclWrite.blockIndex;
    const varDeclNode = varDeclBlock[varDeclIndex];

    if (varDeclNode.kind !== 'let') return;
    
    let yTracksXInversely = false;
    let yTracksXDirectly = false;
    let controlVarName = '';

    const initNode = varDeclNode.init;

    // Look for a var that is initialized as the boolean !inverse or Boolean(state) or !!state of another var
    if (initNode.type === 'UnaryExpression' && initNode.operator === '!') {
      if (initNode.argument.type === 'Identifier') {
        yTracksXInversely = true;
        controlVarName = initNode.argument.name;
      }
    }
    else if (initNode.type === 'CallExpression' && initNode.callee.type === 'Identifier') {
      // Check for Boolean(x)
      const calleeName = initNode.callee.name;
      if (calleeName === symbo('boolean', 'constructor')) {
        if (initNode.arguments.length === 1 && initNode.arguments[0].type === 'Identifier') {
          yTracksXDirectly = true;
          controlVarName = initNode.arguments[0].name;
        }
      }
    }
    else if (initNode.type === 'Identifier') {
      // let y = x;
      yTracksXDirectly = true;
      controlVarName = initNode.name;
    }

    if (!yTracksXInversely && !yTracksXDirectly) return; // Not a recognized pattern
    if (!controlVarName) return; // Should not happen if tracksDirectly/Inversely is true

    // This is the variable that "controls" the value of the current var. This is TDZ, ignore here.
    if (controlVarName === varName) return; // `let x = x` or `let x = !x`

    // Check if any read of this ident is an if-test
    meta.reads.some(read => {
      const secondIfNode = read.parentNode;
      const secondIfBlock = read.blockBody;
      const secondIfIndex = read.blockIndex;
      if (secondIfNode.type !== 'IfStatement' || read.parentProp !== 'test') return; // or true? can this recover?

      if (!(+varDeclNode.$p.pid < +secondIfNode.$p.pid)) return true; // first read must be after var decl

      // Now find the first `if`, it will test on the control var
      // `let x = !CONTROL; if (CONTROL) x=true; if (x) ...`
      let firstIfNode = null;
      // Walk back from second if to var, try to find the target "first if"
      for (let i = secondIfIndex - 1; i > varDeclIndex; --i) {
        const prevNode = varDeclWrite.blockBody[i];
        if (!prevNode) continue;
        // `if (x)`
        if (prevNode.type === 'IfStatement' && prevNode.test.type === 'Identifier' && prevNode.test.name === controlVarName) {
          // Kinda think this is implied but either way, the var decl < first if < second if.
          if (+varDeclNode.$p.pid < +prevNode.$p.pid && +prevNode.$p.pid < +secondIfNode.$p.pid) {
            firstIfNode = prevNode;
            break;
          }
        }
      }
      if (!firstIfNode) return;

      // Check for intervening writes to varName (y) between firstIfNode and secondIfNode.
      // An "intervening write" is an assignment to `varName` that occurs chronologically
      // AFTER `firstIfNode` and BEFORE `secondIfNode`, AND is NOT part of `firstIfNode`'s
      // own `then` or `else` blocks.
      // Such writes would invalidate the analysis of `varName` based on `firstIfNode`.
      //
      // Example of an INTERVENING WRITE (current transformation should be SKIPPED):
      //   let y = !x;
      //   if (x) { /* firstIfNode */ y = true; } 
      //   y = someGlobal;                                // <-- Intervening write to y
      //   if (y) { /* secondIfNode */ ... }
      //
      // Example of a write that is NOT INTERVENING (it's part of firstIfNode analysis):
      //   let y = !x;
      //   if (x) { /* firstIfNode */ y = true; }         // <-- Write is INSIDE firstIfNode
      //   /* No other writes to y here */
      //   if (y) { /* secondIfNode */ ... }
      //
      let hasInterveningWrite = false;
      const firstIfNodePID = firstIfNode.$p.pid;
      const secondIfNodePID = secondIfNode.$p.pid;
      vlog(`- Intervening write check for var '${varName}'. ControlIf PID: ${firstIfNodePID}, TargetIf PID: ${secondIfNodePID}. Num writes: ${meta.writes.length}`);
      for (let j = 1; j < meta.writes.length; j++) { // Start from 1 to skip var declaration
        const writeRef = meta.writes[j];
        vlog(`- Checking writeRef index ${j}, kind: ${writeRef.kind}, node type: ${writeRef.node.type}, PID of writeRef.node: ${writeRef.node.$p ? writeRef.node.$p.pid : 'N/A'}`);
        
        const interveningStmtNode = writeRef.blockBody[writeRef.blockIndex];
        const interveningWritePID = +interveningStmtNode.$p.pid;

        const conditionMetPID = interveningWritePID > firstIfNodePID && interveningWritePID < secondIfNodePID;
        vlog(`  - Write Stmt Node Type: ${interveningStmtNode.type}, PID: ${interveningWritePID} (original: '${interveningWritePID}'). PID Condition (${interveningWritePID} > ${firstIfNodePID} && ${interveningWritePID} < ${secondIfNodePID}) is ${conditionMetPID}`);

        if (conditionMetPID) {
          // Now check if interveningStmtNode is a descendant of firstIfNode
          let isDescendant = false;
          const writeStmtBlock = writeRef.blockBody; // The array containing interveningStmtNode
          vlog(`    - Starting descendant check. Intervening Stmt PID: ${interveningStmtNode.$p ? interveningStmtNode.$p.pid : 'N/A'}. ControlIf PID: ${firstIfNode.$p ? firstIfNode.$p.pid : 'N/A'}.`);
          vlog(`    - writeRef.blockBody === firstIfNode.consequent?.body : ${writeStmtBlock === firstIfNode.consequent?.body}`);
          vlog(`    - writeRef.blockBody === firstIfNode.alternate?.body : ${writeStmtBlock === firstIfNode.alternate?.body}`);

          if (firstIfNode.consequent.body === writeRef.blockBody) {
            isDescendant = true;
          } else if (firstIfNode.alternate.body === writeRef.blockBody) {
            isDescendant = true;
          } else {
            // Fallback to parent traversal if not in the immediate block bodies
          }
          vlog(`    - Is descendant of controlIf (final): ${isDescendant}`);

          if (!isDescendant) {
            vlog(`   - bail: intervening write detected for var '${varName}'.`);
            hasInterveningWrite = true;
            break;
          }
        }
      }
      vlog(`- Final hasInterveningWrite for '${varName}' (read in PID ${secondIfNodePID}): ${hasInterveningWrite}`);
      if (hasInterveningWrite) {
        return; // Skip this (firstIfNode, secondIfNode) pair due to intervening write
      }

      // Note: `y` is the alias from the initial `let y = !x`
      let yMadeTruthyInThen = false;
      let yMadeFalsyInElse = false;
      let yReassignedInThen = false;
      let yReassignedInElse = false;
      let yMadeFalsyInThen = false; // Initialize yMadeFalsyInThen
      let yMadeTruthyInElse = false; // Initialize yMadeTruthyInElse
      let yMadeControlVarEquivalentInThen = false; // y = x
      let yMadeControlVarInverseInThen = false;  // y = !x
      let yMadeControlVarEquivalentInElse = false; // y = x
      let yMadeControlVarInverseInElse = false;   // y = !x

      // Walk all statements in the consequent. Search for assignments to the alias.
      firstIfNode.consequent.body.forEach(stmt => {
        if (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') {
          const assign = stmt.expression;
          if (assign.left.type === 'Identifier' && assign.left.name === varName) {
            yReassignedInThen = true;
            const rhsNode = assign.right;
            if (AST.isPrimitive(rhsNode)) {
              const val = AST.getPrimitiveValue(rhsNode);
              if (val) yMadeTruthyInThen = true;
              else yMadeFalsyInThen = true; // Set yMadeFalsyInThen
            } else if (['ObjectExpression', 'ArrayExpression', 'FunctionExpression', 'RegExpLiteral', 'ArrowFunctionExpression'].includes(rhsNode.type)) {
              yMadeTruthyInThen = true;
            } else if (rhsNode.type === 'Identifier') {
              const rhsMeta = fdata.globallyUniqueNamingRegistry.get(rhsNode.name);
              if (rhsMeta) {
                if (rhsMeta.isBuiltin && rhsMeta.symbol) {
                  const builtinDef = BUILTIN_SYMBOLS.get(rhsMeta.symbol);
                  if (builtinDef && builtinDef.typings) {
                    if (builtinDef.typings.mustBeTruthy === true) {
                      yMadeTruthyInThen = true;
                    } else if (builtinDef.typings.mustBeFalsy === true) {
                      yMadeFalsyInThen = true;
                    }
                    // If neither, it's neither explicitly always true nor always false (e.g. a function object itself is truthy, handled by other checks if it were a literal)
                    // This path primarily handles identifiers like NaN, Infinity. `undefined` as an identifier would also be caught if symbolized and in BUILTIN_SYMBOLS with mustBeFalsy.
                  }
                } else if (rhsNode.name === controlVarName) {
                  yMadeControlVarEquivalentInThen = true;
                }
              }
            } else if (rhsNode.type === 'UnaryExpression' && rhsNode.operator === '!' && rhsNode.argument.type === 'Identifier' && rhsNode.argument.name === controlVarName) {
              yMadeControlVarInverseInThen = true;
            }
          }
        }
      });

      // Repeat for the alternate branch
      if (firstIfNode.alternate && firstIfNode.alternate.type === 'BlockStatement') {
        firstIfNode.alternate.body.forEach(stmt => {
          if (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') {
            const assign = stmt.expression;
            if (assign.left.type === 'Identifier' && assign.left.name === varName) {
              yReassignedInElse = true;
              const rhsNode = assign.right;
              if (AST.isPrimitive(rhsNode)) {
                const val = AST.getPrimitiveValue(rhsNode);
                if (!val) yMadeFalsyInElse = true;
                else yMadeTruthyInElse = true; // Set yMadeTruthyInElse
              } else if (rhsNode.type === 'Identifier') {
                const rhsMeta = fdata.globallyUniqueNamingRegistry.get(rhsNode.name);
                if (rhsMeta) {
                  if (rhsMeta.isBuiltin && rhsMeta.symbol) {
                    const builtinDef = BUILTIN_SYMBOLS.get(rhsMeta.symbol);
                    if (builtinDef && builtinDef.typings) {
                      if (builtinDef.typings.mustBeTruthy === true) {
                        yMadeTruthyInElse = true;
                      } else if (builtinDef.typings.mustBeFalsy === true) {
                        yMadeFalsyInElse = true;
                      }
                    }
                  } else if (rhsNode.name === controlVarName) {
                    yMadeControlVarEquivalentInElse = true;
                  }
                }
              } else if (rhsNode.type === 'UnaryExpression' && rhsNode.operator === '!' && rhsNode.argument.type === 'Identifier' && rhsNode.argument.name === controlVarName) {
                yMadeControlVarInverseInElse = true;
              }
            }
          }
        });
      }

      vlog('Analysis for Y (decl)=', varName, ' (regKey)=', varName, ' X=', controlVarName, 
           { yTracksXDirectly, yTracksXInversely },
           { yMadeTruthyInThen, yReassignedInThen, yMadeFalsyInElse, yReassignedInElse, 
             yMadeFalsyInThen, yMadeTruthyInElse, // Add to vlog
             yMadeControlVarEquivalentInThen, yMadeControlVarInverseInThen, yMadeControlVarEquivalentInElse, yMadeControlVarInverseInElse },
           `(PIDs: D=${varDeclNode.$p.pid} C=${firstIfNode.$p.pid} T=${secondIfNode.$p.pid})`);
      
      // Determine final state of y and the AST node to represent it
      let yEffectivelyTrue = false;
      let yEffectivelyFalse = false;
      let yEffectivelySameAsControl = false;
      let yEffectivelyInverseOfControl = false;

      // Case 1: y is always true after if/else
      if (
        (yTracksXInversely && (!yReassignedInThen || yMadeTruthyInThen || yMadeControlVarInverseInThen) && (!yReassignedInElse || yMadeTruthyInElse || yMadeControlVarInverseInElse)) ||
        (yTracksXDirectly && (yMadeTruthyInThen || (!yReassignedInThen && controlVarName)) && (yMadeTruthyInElse || (!yReassignedInElse && !controlVarName /* this !controlVarName means x is false, so y stays true */))) ||
        (yTracksXDirectly && (yMadeTruthyInThen || (!yReassignedInThen && controlVarName)) && (!yReassignedInElse && yTracksXDirectly)) // y=x, if(x){y=true}else{} -> y is true
      ) {
        let determinedTrue = false;
        if (yTracksXInversely) {
          const yInElseIsTrue = !yReassignedInElse || yMadeTruthyInElse || yMadeControlVarInverseInElse;
          if (yMadeTruthyInThen && yInElseIsTrue) determinedTrue = true;
        } 
        if (!determinedTrue && yTracksXDirectly) {
          const yInThenIsTrue = !yReassignedInThen || yMadeTruthyInThen || yMadeControlVarEquivalentInThen;
          if (yInThenIsTrue && yMadeTruthyInElse) determinedTrue = true;
        }
        if (determinedTrue) yEffectivelyTrue = true;
      }
      
      // Case 2: y is always false after if/else
      if (!yEffectivelyTrue) { 
        let determinedFalse = false;
        if (yTracksXInversely) {
          const yInThenIsFalse = !yReassignedInThen || yMadeFalsyInThen || yMadeControlVarInverseInThen;
          if (yInThenIsFalse && yMadeFalsyInElse) determinedFalse = true;
        }
        if (!determinedFalse && yTracksXDirectly) {
          const yInElseIsFalse = !yReassignedInElse || yMadeFalsyInElse || yMadeControlVarEquivalentInElse;
          if (yMadeFalsyInThen && yInElseIsFalse) determinedFalse = true;
        }
        if (determinedFalse) yEffectivelyFalse = true;
      }
      
      // Case 3 & 4: y becomes equivalent to x or !x
      if (!yEffectivelyTrue && !yEffectivelyFalse) {
        let determinedSameAsControl = false;
        let determinedInverseOfControl = false;

        if (yTracksXDirectly) { // Initial: y = x
          // To become SAME as x: if(x){y=true} else{y=false} OR if(x){y=x} else{y=x}
          if (
            (yMadeTruthyInThen || yMadeControlVarEquivalentInThen || (!yReassignedInThen && yTracksXDirectly)) &&
            (yMadeFalsyInElse || yMadeControlVarEquivalentInElse || (!yReassignedInElse && yTracksXDirectly))
          ) {
            determinedSameAsControl = true;
          }
          // To become INVERSE of x: if(x){y=false} else{y=true} OR if(x){y=!x} else{y=!x}
          if (
            (yMadeFalsyInThen || yMadeControlVarInverseInThen) &&
            (yMadeTruthyInElse || yMadeControlVarInverseInElse)
          ) {
            determinedInverseOfControl = true;
          }
        } else if (yTracksXInversely) { // Initial: y = !x
          // To become SAME as x: if(x){y=true} else{y=false} OR if(x){y=x} else{y=x}
          // (y was false in then, true in else. To become x: y=true in then, y=false in else)
          if (
            (yMadeTruthyInThen || yMadeControlVarEquivalentInThen) &&
            (yMadeFalsyInElse || yMadeControlVarEquivalentInElse)
          ) {
            determinedSameAsControl = true;
          }
          // To become INVERSE of x: if(x){y=false} else{y=true} OR if(x){y=!x} else{y=!x}
          // (y was false in then, true in else. To remain !x: y=false in then, y=true in else)
          if (
            (yMadeFalsyInThen || yMadeControlVarInverseInThen || (!yReassignedInThen && yTracksXInversely)) &&
            (yMadeTruthyInElse || yMadeControlVarInverseInElse || (!yReassignedInElse && yTracksXInversely))
          ) {
            determinedInverseOfControl = true;
          }
        }

        if (determinedSameAsControl) {
          yEffectivelySameAsControl = true;
        } else if (determinedInverseOfControl) {
          // Only set if not already determined to be same (though logic should be mutually exclusive)
          // and also not already constant true/false (already guarded by outer if)
          yEffectivelyInverseOfControl = true;
        }
      }

      // Handle controlIf being constant true/false (overrides previous general logic)
      if (firstIfNode.test.type === 'BooleanLiteral') {
        const controlIfTestValue = firstIfNode.test.value;
        yEffectivelyTrue = false; 
        yEffectivelyFalse = false;
        yEffectivelySameAsControl = false;
        yEffectivelyInverseOfControl = false;

        if (controlIfTestValue) { // if(true) path
          if (yTracksXInversely) { // y was false
            if (yMadeTruthyInThen) yEffectivelyTrue = true;
            else if (yMadeControlVarInverseInThen) yEffectivelyFalse = true; 
            else if (yMadeControlVarEquivalentInThen) yEffectivelyTrue = true; 
            else if (!yReassignedInThen) yEffectivelyFalse = true; 
          } else { // yTracksXDirectly, y was true
            if (yMadeFalsyInThen) yEffectivelyFalse = true;
            else if (yMadeControlVarInverseInThen) yEffectivelyFalse = true; 
            else if (yMadeControlVarEquivalentInThen) yEffectivelyTrue = true; 
            else if (!yReassignedInThen) yEffectivelyTrue = true; 
          }
        } else { // if(false) path - evaluate based on 'else' assignments
          if (yTracksXInversely) { // y was true
            if (yMadeFalsyInElse) yEffectivelyFalse = true;
            else if (yMadeControlVarInverseInElse) yEffectivelyTrue = true; 
            else if (yMadeControlVarEquivalentInElse) yEffectivelyFalse = true; 
            else if (!yReassignedInElse) yEffectivelyTrue = true; 
          } else { // yTracksXDirectly, y was false
            if (yMadeTruthyInElse) yEffectivelyTrue = true;
            else if (yMadeControlVarInverseInElse) yEffectivelyTrue = true; 
            else if (yMadeControlVarEquivalentInElse) yEffectivelyFalse = true; 
            else if (!yReassignedInElse) yEffectivelyFalse = true; 
          }
        }
      }

      // Perform the primary transformation of secondIfNode
      if (yEffectivelyTrue) {
        rule(`When we can infer that an if-test is always true, replace the if with the consequent branch`);
        example(
          `let y = !x; if (x) { y=true; } else { } if (y) { $('then'); } else { $('else'); }`,
          `let y = !x; if (x) { y=true; } else { } $('then');`
        );
        example(
          `let y = x; if (x) { } else { y=true; } if (y) { $('then'); } else { $('else'); }`,
          `let y = x; if (x) { } else { y=true; } $('then');`
        );
        before(secondIfNode);
        
        secondIfBlock[secondIfIndex] = secondIfNode.consequent;
        queue.push({index: secondIfIndex, func: () => secondIfBlock.splice(secondIfIndex, 1, ...secondIfBlock[secondIfIndex].body)});

        after(secondIfBlock[secondIfIndex]);
        changes += 1;
        return true;
      } else if (yEffectivelyFalse) {
        rule(`When we can infer that an if-test is always false, replace the if with the alternate branch`);
        example(
          `let y = !x; if (x) { } else { y=false; } if (y) { $('then'); } else { $('else'); }`,
          `let y = !x; if (x) { } else { y=false; } $('else');`
        );
        example(
          `let y = x; if(x) { y=false; } else { } if (y) { $('then'); } else { $('else'); }`,
          `let y = x; if(x) { y=false; } else { } $('else');`
        );
        before(secondIfNode);

        secondIfBlock[secondIfIndex] = secondIfNode.alternate;
        queue.push({index: secondIfIndex, func: () => secondIfBlock.splice(secondIfIndex, 1, ...secondIfBlock[secondIfIndex].body)});

        after(secondIfBlock[secondIfIndex]);
        changes += 1;
        return true;
      } else {
        // Change the second if test?
        let newNodeForTest = null;
        if (yEffectivelyTrue) newNodeForTest = AST.tru();
        else if (yEffectivelyFalse) newNodeForTest = AST.fals();
        else if (yEffectivelySameAsControl) newNodeForTest = AST.identifier(controlVarName);
        else if (yEffectivelyInverseOfControl) newNodeForTest = AST.unaryExpression('!', AST.identifier(controlVarName));

        if (newNodeForTest) {
          if (yEffectivelySameAsControl) {
            rule(`When we know a var is an ternary alias to another var we can replace ifs testing on it`);
            example(
              `let y = !x; if(x) { y=true; } else { y=false; } if(y) { $('then'); } else { $('else'); }`,
              `let y = !x; if(x) { y=true; } else { y=false; } if(x) { $('then'); } else { $('else'); }`
            );
          } else { // yEffectivelyInverseOfControl
            rule(`When we know a var is an ternary inverted alias to another var we can replace ifs testing on it`);
            example(
              `let y = x; if(x) { y=false; } else { y=true; } if(y) { $('then'); } else { $('else'); }`,
              `let y = x; if(x) { y=false; } else { y=true; } if(x){ $('else'); } else { $('then'); }` // inverted!
            );
          }
          before(secondIfNode);

          secondIfNode.test = newNodeForTest;

          after(secondIfNode);
          changes += 1;
          return true;
        }
      }
    });
  });

  if (changes > 0) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func()); // Flatten the blocks to normalize

    log(`[ifFoldTernaryConst] Total changes made directly: ${changes}. Restarting from phase1.`);
    return { what: 'ifFoldTernaryConst', changes: changes, next: 'phase1' };
  }
  log('[ifFoldTernaryConst] No changes made directly.');
  return undefined;
} 
