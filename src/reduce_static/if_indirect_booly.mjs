// Find bindings that are only used in booly tests (if/while/!/Boolean) but which are an indirect booly test
// of another value. Then eliminate them.
//
//    `let x = undefined; let y = x === undefined; if (y) x = true`
// ->
//    `let x = false; if (x) x = true;
//
// and if we can eliminate an expression because we know all values for an arg and
// the expression exhaustively results in the same outcome, then we do that too here:
//
//    `let x = 1; let y = x === 2; if (y) x = 3; $(x);`      // x can be 1 or 3 but never 2 in this code
// ->
//    `let x = 1; let y = false; if (y) x = 3; $(x);`
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function ifIndirectBooly(fdata) {
  group('\n\n\n[ifIndirectBooly] Looking for bindings only used to booly test another variable\n');
  const r = _ifIndirectBooly(fdata);
  groupEnd();
  return r;
}
function _ifIndirectBooly(fdata) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;
    if (!meta.varDeclRef) return; // catch
    if (!meta.reads.length) return; // dead
    if (meta.writes.length !== 1) return; // should only be assigned the booly value of another var

    vgroup('- `' + name + '`:', meta.varDeclRef.node.type);

    process(meta, name);

    vgroupEnd();
  });

  function process(meta, name) {

    // Checking for === and !==
    if (meta.varDeclRef.node.type !== 'BinaryExpression') return;
    const ipl = AST.isPrimitive(meta.varDeclRef.node.left);
    const rpl = AST.isPrimitive(meta.varDeclRef.node.right);
    if (ipl === rpl) return; // Either both are primitives (another rule will take care of this) or neither side is (not our target pattern)
    let ident;
    let value;
    if (ipl && meta.varDeclRef.node.right.type === 'Identifier') {
      value = AST.getPrimitiveValue(meta.varDeclRef.node.left);
      ident = meta.varDeclRef.node.right;
    }
    else if (rpl && meta.varDeclRef.node.left.type === 'Identifier') {
      ident = meta.varDeclRef.node.left;
      value = AST.getPrimitiveValue(meta.varDeclRef.node.right);
    }
    else return; // we want to compare an ident to a primitive

    const operator = meta.varDeclRef.node.operator;

    // We have now verified this binding only ever holds the result comparing an identifier to a primitive
    // I suspect there's a few interesting things we can do here. But first of all we can do the `y = x === false; if (y)` case

    // Next: verify that at least one read is an if-test
    const iffed = meta.reads.some(read => read.parentNode.type === 'IfStatement');
    if (!iffed) return;

    // This may still be a bust if the ident is not actually a booly so let's check that next
    const identMeta = fdata.globallyUniqueNamingRegistry.get(ident.name);
    if (!identMeta.allAssignedValues) return; // Assigned values to that ident are not explicit primitives in source right now

    if (['===', '!==', '==', '!=', '<=', '<', '>=', '>', '>>', '>>>', '%', '+', '-', '/', '*', '&', '|', '^'].includes(operator)) {

      // Edge case: if the outcome of the operator is equal for all values the ident could possibly have then we can inline
      //            the expression entirely, regardless of the expression.

      function test(ipl, option, value) {
        switch (operator) {
          case '===': return ipl ? value === option : option === value; break;
          case '!==': return ipl ? value !== option : option !== value; break;
          case '==': return ipl ? value == option : option == value; break;
          case '!=': return ipl ? value != option : option != value; break;
          case '<=': return ipl ? value <= option : option <= value; break;
          case '<': return ipl ? value < option : option < value; break;
          case '>=': return ipl ? value >= option : option >= value; break;
          case '>': return ipl ? value > option : option > value; break;
          case '>>': return ipl ? value >> option : option >> value; break;
          case '>>>': return ipl ? value >>> option : option >>> value; break;
          case '%': return ipl ? value % option : option % value; break;
          case '+': return ipl ? value + option : option + value; break;
          case '-': return ipl ? value - option : option - value; break;
          case '/': return ipl ? value / option : option / value; break;
          case '*': return ipl ? value * option : option * value; break;
          case '&': return ipl ? value & option : option & value; break;
          case '|': return ipl ? value | option : option | value; break;
          case '^': return ipl ? value ^ option : option ^ value; break;
          default: ASSERT(false, 'operator was tested before??', operator);
        }
      }

      // if (ipl) vlog('Checking (ipl=true):', identMeta.allAssignedValues, [operator, value], '->', Array.from(identMeta.allAssignedValues).map(o => test(ipl, o, value)));
      // else vlog('Checking (ipl=false):', [value, operator], identMeta.allAssignedValues, '->', Array.from(identMeta.allAssignedValues).map(o => test(ipl, o, value)));
      let result;
      let first = true;
      let bailed = true;
      for (const option of identMeta.allAssignedValues) {
        let out = test(ipl, option, value);

        if (first) {
          result = out;
          first = false;
        }
        bailed = !Object.is(result, out)
        if (bailed) break;
      }
      if (!bailed) {
        const write = meta.writes[0];

        // kay, all possible operations with this value lead to same outcome so we should use that outcome.
        rule('When an operation leads to the same outcome in all possible worlds, inline it');
        example('let x = 1; let y = x === 2; if (y) x = 3;', 'let x = 1; let y = false; if (y) x = 3;');
        before(write.blockBody[write.blockIndex]);

        // This was a vardeclref, eg. `var x = <ref>` so we should be able to safely .init here
        write.parentNode.init = AST.primitive(result);

        after(write.blockBody[write.blockIndex]);
        changes += 1;
        return;
      }
    }

    // If the meta we are processing is only used as a test and we can assert the other ident can only have
    // exactly one value of the booly state that is being tested against (for example, if a number, "0, 1, 2"
    // would have exactly one "falsy" boolean value zero so if the meta was `y = x === 0; if (y)` then that's
    // what we're looking for but if the set of values is `null 0 1 2 3` then we can't do it since the `if (y)`
    // would not cover the load due to the `null` case).

    // vlog('is strict eq?')
    // Only target strict eq for now
    if (operator === '===' || operator === '!==') {
      // vlog('has one test read?')
      // The meta should only be read as an if-test (in ESTree, only the if-statement has a `test` property)
      if (meta.reads.length === 1 && meta.reads[0].parentProp === 'test') {
        let trues = 0;
        let falses = 0;
        for (const x of identMeta.allAssignedValues) if (x) trues += 1; else falses += 1;
        // Only proceed when either boolean state has exactly one value in the set
        // vlog('has one booly?', trues, falses)
        if (trues === 1 || falses === 1) {
          // Now we need to be checking against that single bool value...
          // vlog('matched right booly?', !!value, trues, falses, [value], (value && trues === 1) && (!value && falses === 1))
          if ((value && trues === 1) || (!value && falses === 1)) {
            // Ok, this should mean that we tested exactly against the boolean state for which there was only one in the set
            // This means we should be able to eliminate it?

            rule('When a var is used to proxy a booly if test it should be eliminated');
            example('let x = false; let y = x === false; if (y) x = true;', 'let x = false; let y = x === false; if (!x) x = true;');
            example('let x = false; let y = x !== true; if (y) x = true;', 'let x = false; let y = x !== true; if (!x) x = true;');
            before(meta.reads[0].blockBody[meta.reads[0].blockIndex]);

            meta.reads[0].parentNode.test = AST.identifier(ident.name);
            if (!!value === (operator === '===')) {
              // In this case the proxy is checking "y = x === true; if (y)" so we want to keep this
            } else {
              // In this case the proxy is checking "y = x === false; if (y)" so we want swap if/else (`if (!x))`)
              let tmp = meta.reads[0].parentNode.consequent;
              meta.reads[0].parentNode.consequent = meta.reads[0].parentNode.alternate;
              meta.reads[0].parentNode.alternate = tmp;
            }

            after(meta.reads[0].blockBody[meta.reads[0].blockIndex]);
            changes += 1;
            return;
          }
        }
      }
    }
  }

  if (changes) {
    log('Indirect booly tests cleaned up:', changes, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'ifIndirectBooly', changes, next: 'phase1'};
  }

  log('Indirect booly tests cleaned up: 0.');
}
