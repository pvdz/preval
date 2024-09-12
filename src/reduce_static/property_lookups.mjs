// Find properties that we can inline. Use type inference or whatever.

import walk from '../../lib/walk.mjs';
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
  findBodyOffset, riskyRule, useRiskyRules,
} from '../utils.mjs';
import {
  BUILTIN_ARRAY_METHOD_LOOKUP,
  BUILTIN_ARRAY_METHODS_SUPPORTED,
  BUILTIN_STRING_METHODS_SUPPORTED,
  BUILTIN_STRING_METHOD_LOOKUP,
  BUILTIN_FUNCTION_METHODS_SUPPORTED,
  BUILTIN_NUMBER_METHODS_SUPPORTED,
  BUILTIN_NUMBER_METHOD_LOOKUP,
  BUILTIN_REGEXP_METHODS_SUPPORTED,
  BUILTIN_REGEXP_METHOD_LOOKUP,
  PREVAL_BUILTIN_SYMBOLS,
  PREVAL_PROTO_SYMBOLS_TO_LOOKUP,
  BUILTIN_FUNCTION_METHOD_LOOKUP,
} from '../constants.mjs';
import * as AST from '../ast.mjs';
import {getPrimitiveType} from "../ast.mjs"

export function propertyLookups(fdata) {
  group('\n\n\nFinding static builtin properties to resolve\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _propertyLookups(fdata);
  groupEnd();
  return r;
}
function _propertyLookups(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'MemberExpression') return;
    if (node.computed) return; // For now, anyways

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    const grandProp = path.props[path.props.length - 2];
    const grandIndex = path.indexes[path.indexes.length - 2];

    if (parentNode.type === 'CallExpression') return; // Bail on method calls for now.
    ASSERT(parentNode.type !== 'NewExpression', 'normalized code should not have member expressions as the callee of a new (nor its args)');

    log('-', node.computed ? node.object.type + '[' + node.property.type + ']' : node.object.type + '.' + node.property.type, '(', tmat(node, true), ')');

    const isPrimitive = AST.isPrimitive(node.object);
    if (isPrimitive || (node.object.type === 'Identifier' && node.object.name !== 'arguments')) {
      ASSERT(isPrimitive || fdata.globallyUniqueNamingRegistry.get(node.object.name)?.typing, 'if not a primitive then the ident should be known and have typing data available');
      const mustBe = isPrimitive ? getPrimitiveType(node.object) : fdata.globallyUniqueNamingRegistry.get(node.object.name).typing.mustBeType;

      //const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
      vlog('  -', node.computed ? node.object.name + '[' + node.property.type + ']' : node.object.name + '.' + node.property.name);
      vlog('    - typing for obj is::', mustBe);
      if (mustBe === 'array') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (BUILTIN_ARRAY_METHODS_SUPPORTED.includes(prop)) {
          // Add to the list here: Array#filter, Array#flat, Array#concat, Array#push, Array#pop, Array#shift, Array#unshift
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function#flat ...
            riskyRule('Fetching but not calling a method from Array.prototype should do this explicitly');
            example('f([].flat)', 'f(' + BUILTIN_ARRAY_METHOD_LOOKUP['flat'] + ')');
            before(node, grandNode);

            ASSERT(BUILTIN_ARRAY_METHOD_LOOKUP[prop], 'missing array method name should have constant', prop); // just add it.
            const newNode = AST.identifier(BUILTIN_ARRAY_METHOD_LOOKUP[prop]);
            if (parentIndex < 0) parentNode[parentProp] = newNode;
            else parentNode[parentProp][parentIndex] = newNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        } else if (prop === 'constructor') {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function ...
            riskyRule('Fetching the `constructor` prop from an array should return `Array`');
            example('f([].constructor)', 'f(Array)');
            before(node, grandNode);

            const finalNode = AST.identifier('Array');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      }
      else if (mustBe === 'function') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (BUILTIN_FUNCTION_METHODS_SUPPORTED.includes(prop)) {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function#flat ...
            riskyRule('Fetching but not calling a method from Function.prototype should do this explicitly');
            example('f(f.call)', 'f(' + BUILTIN_FUNCTION_METHOD_LOOKUP['call'] + ')');
            before(node, grandNode);

            ASSERT(BUILTIN_FUNCTION_METHOD_LOOKUP[prop], 'missing Function method name should have constant', prop); // just add it.
            const newNode = AST.identifier(BUILTIN_FUNCTION_METHOD_LOOKUP[prop]);
            if (parentIndex < 0) parentNode[parentProp] = newNode;
            else parentNode[parentProp][parentIndex] = newNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        } else if (prop === 'constructor') {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function ...
            riskyRule('Fetching the `constructor` prop from a function should return `Function`');
            example('f(parseInt.constructor)', 'f(Function)');
            before(node, grandNode);

            const finalNode = AST.identifier('Function');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      }
      else if (mustBe === 'boolean') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (prop === 'constructor') {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Number ...
            riskyRule('Fetching the `constructor` prop from a boolean should return `Boolean`');
            example('f(false.constructor)', 'f(Boolean)');
            before(node, grandNode);

            const finalNode = AST.identifier('Boolean');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      }
      else if (mustBe === 'number') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (BUILTIN_NUMBER_METHODS_SUPPORTED.includes(prop)) {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function#flat ...
            riskyRule('Fetching but not calling a method from Function.prototype should do this explicitly');
            example('f(NaN.toString)', 'f(' + BUILTIN_NUMBER_METHOD_LOOKUP['toString'] + ')');
            before(node, grandNode);

            ASSERT(BUILTIN_NUMBER_METHOD_LOOKUP[prop], 'missing Function method name should have constant', prop); // just add it.
            const newNode = AST.identifier(BUILTIN_NUMBER_METHOD_LOOKUP[prop]);
            if (parentIndex < 0) parentNode[parentProp] = newNode;
            else parentNode[parentProp][parentIndex] = newNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        } else if (prop === 'constructor') {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Number ...
            riskyRule('Fetching the `constructor` prop from a number should return `Number`');
            example('f("hello".constructor)', 'f(Number)');
            before(node, grandNode);

            const finalNode = AST.identifier('Number');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      }
      else if (mustBe === 'string') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (BUILTIN_STRING_METHODS_SUPPORTED.includes(prop)) {
          // Add to the list here: String#toString
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is String#toString ...
            riskyRule('Fetching but not calling a method from String.prototype should do this explicitly');
            example('f("foo".toString)', 'f(' + BUILTIN_STRING_METHOD_LOOKUP['toString'] + ')');
            before(node, grandNode);

            ASSERT(BUILTIN_STRING_METHOD_LOOKUP[prop], 'props should be an object.keys() so this should work');
            const finalNode = AST.identifier(BUILTIN_STRING_METHOD_LOOKUP[prop]);
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        } else if (prop === 'constructor') {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is String ...
            riskyRule('Fetching the `constructor` prop from a string should return `String`');
            example('f("hello".constructor)', 'f(String)');
            before(node, grandNode);

            const finalNode = AST.identifier('String');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      }
      else if (mustBe === 'regex') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (BUILTIN_REGEXP_METHODS_SUPPORTED.includes(prop)) {
          // Add to the list here: String#toString
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is String#toString ...
            riskyRule('Fetching but not calling a method from String.prototype should do this explicitly');
            example('f(/foo/.test)', 'f(' + BUILTIN_REGEXP_METHOD_LOOKUP['test'] + ')');
            before(node, grandNode);

            ASSERT(BUILTIN_REGEXP_METHOD_LOOKUP[prop], 'props should be an object.keys() so this should work');
            const finalNode = AST.identifier(BUILTIN_REGEXP_METHOD_LOOKUP[prop]);
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        } else if (prop === 'constructor') {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is RegExp ...
            riskyRule('Fetching the `constructor` prop from a function should return `Function`');
            example('f(/foo/.constructor)', 'f(RegExp)');
            before(node, grandNode);

            const finalNode = AST.identifier('RegExp');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      }
      else if (mustBe === 'object') {
        // Eliminate statements that are member expressions where object and property are known builtins
        // I think it's fine to even drop any property lookup on known builtins.
        // Technically expandos could cause observable side effects for accessing them. But aren't you just really trying at that point?

        if (!isPrimitive && !node.computed) {
          if (useRiskyRules() && PREVAL_BUILTIN_SYMBOLS.includes(node.object.name)) {
            vlog(`    - ${node.object.name} is a known global`);

            const knownAlias = PREVAL_PROTO_SYMBOLS_TO_LOOKUP[node.object.name]?.[node.property.name];

            if (parentNode.type === 'ExpressionStatement') {
              vlog(`    - this member expression is a statement so if we know it has no side effects it can be dropped`);
              if (knownAlias) {
                rule('Known property of built-in prototype that is a statement can be eliminated safely');
                example('f(); $NumberPrototype.toString; g();', 'f(); ; g();');
                before(grandNode[grandProp][grandIndex]);

                grandNode[grandProp][grandIndex] = AST.emptyStatement();

                after(grandNode[grandProp][grandIndex]);
                ++changes;
                return;
              }
              // TODO: another case is more risky but accessing a property of an object literal should be fine
            } else if (knownAlias) {
              rule('Known property of built-in prototype object should be a special alias');
              example('f(Number.toString)', 'f($number_toString)');
              before(grandNode[grandProp]);

              if (parentIndex < 0) parentNode[parentProp] = AST.identifier(knownAlias);
              else parentNode[parentProp][parentIndex] = AST.identifier(knownAlias);

              after(grandNode[grandProp]);
              ++changes;
              return;
            }
          }
        }

        vlog('    - have no further rules for this...');
      }
      else {
        vlog('    - have no rules for this case...');
      }
    }
  }

  if (changes) {
    log('Properties resolved:', changes, '. Restarting from phase1');
    return {what: 'propertyLookups', changes: changes, next: 'phase1'};
  }

  log('Properties resolved: 0.');
}
