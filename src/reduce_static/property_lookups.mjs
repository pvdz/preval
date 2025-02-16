// Find properties that we can inline. Use type inference or whatever.

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, riskyRule, useRiskyRules } from '../utils.mjs';
import { BUILTIN_SYMBOLS, NUMBER, STRING, FUNCTION, REGEXP, symbo, ARRAY } from '../symbols_builtins.mjs';
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
        if (ARRAY.has(symbo('array', prop))) {
          // Add to the list here: Array#filter, Array#flat, Array#concat, Array#push, Array#pop, Array#shift, Array#unshift
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function#flat ...
            riskyRule('Fetching but not calling a method from Array.prototype should do this explicitly');
            example('f([].flat)', 'f(' + symbo('array', 'flat') + ')');
            before(node, grandNode);

            const newNode = AST.identifier(symbo('array', 'flat'));
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
        if (FUNCTION.has(symbo('function', prop))) {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function#flat ...
            riskyRule('Fetching but not calling a method from Function.prototype should do this explicitly');
            example('f(f.call)', 'f(' + symbo('function', 'call') + ')');
            before(node, grandNode);

            const newNode = AST.identifier(symbo('function', prop));
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
        if (NUMBER.has(symbo('number', prop))) {
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is Function#flat ...
            riskyRule('Fetching but not calling a method from Function.prototype should do this explicitly');
            example('f(NaN.toString)', 'f(' + symbo('number', 'toString') + ')');
            before(node, grandNode);

            const newNode = AST.identifier(symbo('number', prop));
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
        if (STRING.has(symbo('string', prop))) {
          // Add to the list here: String#toString
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is String#toString ...
            riskyRule('Fetching but not calling a method from String.prototype should do this explicitly');
            example('f("foo".toString)', 'f(' + symbo('string', 'toString') + ')');
            before(node, grandNode);

            const finalNode = AST.identifier(symbo('string', prop));
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
        if (REGEXP.has(symbo('regex', prop))) {
          // Add to the list here: String#toString
          if (useRiskyRules()) {
            // jsf*ck specific support
            // This is String#toString ...
            riskyRule('Fetching but not calling a method from String.prototype should do this explicitly');
            example('f(/foo/.test)', 'f(' + symbo('regex', 'test') + ')');
            before(node, grandNode);

            const finalNode = AST.identifier(symbo('regex', prop));
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
          // `$String_prototype.replace`
          // `$string_replace.toString` -> `$function_toString`
          const targetSymbol = node.object.name;
          const symbolDetails = BUILTIN_SYMBOLS.get(targetSymbol);
          if (useRiskyRules() && symbolDetails) {
            vlog(`    - ${targetSymbol} is a known preval builtin symbol`);

            // `$String_prototype.replace` -> `$string_replace`
            // `$string_replace.toString` -> `$function_toString`
            const newSymbol =
              symbo('Number', 'prototype') === targetSymbol
              ? symbo('number', node.property.name)
              : symbo('String', 'prototype') === targetSymbol
              ? symbo('string', node.property.name)
              : symbo('Boolean', 'prototype') === targetSymbol
              ? symbo('boolean', node.property.name)
              : symbo('RegExp', 'prototype') === targetSymbol
              ? symbo('regex', node.property.name)
              : symbo('Object', 'prototype') === targetSymbol
              ? symbo('object', node.property.name)
              : symbo('Buffer', 'prototype') === targetSymbol
              ? symbo('buffer', node.property.name)
              : symbo('Array', 'prototype') === targetSymbol
              ? symbo('array', node.property.name)
              : symbo('Map', 'prototype') === targetSymbol
              ? symbo('map', node.property.name)
              : symbo('Set', 'prototype') === targetSymbol
              ? symbo('set', node.property.name)
              : symbo('Date', 'prototype') === targetSymbol
              ? symbo('date', node.property.name)
              : symbo('Function', 'prototype') === targetSymbol
              ? symbo('function', node.property.name)
              : symbolDetails.typings.mustBeType !== 'object'
              ? symbo(symbolDetails.typings.mustBeType, node.property.name) // Prevent defaulting to object.toString when you actually need number.toString for example.
              : false;
            const newSymbol2 = (newSymbol && !BUILTIN_SYMBOLS.has(newSymbol))
              ? symbo('object', node.property.name)
              : newSymbol;

            // We should follow the prototype chain though, for example, toString is not defined on regexp but uses $object_toString
            // Other than Error, are there any multi-step builtins? Array -> Object, String -> Object, etc
            // So if we did find a newSymbol then the context was a builtin, then we should try to find the method on object.
            if (newSymbol && BUILTIN_SYMBOLS.has(newSymbol2)) {
              if (parentNode.type === 'ExpressionStatement') {
                vlog(`    - this member expression is a statement so if we know it then has no side effects it can be dropped`);
                riskyRule('Known property of built-in symbol as a statement can be eliminated safely');
                example(`f(); ${symbo('Number', 'prototype')}.toString; g();`, 'f(); ; g();');
                before(grandNode[grandProp][grandIndex]);

                grandNode[grandProp][grandIndex] = AST.emptyStatement();

                after(grandNode[grandProp][grandIndex]);
                ++changes;
                return;
              } else {
                riskyRule('Known property of built-in symbol should be a special alias');
                example(`f(${symbo('Number', 'prototype')}.toString)`, `f(${symbo('number', 'toString')})`);
                before(grandNode[grandProp]);

                if (parentIndex < 0) parentNode[parentProp] = AST.identifier(newSymbol2);
                else parentNode[parentProp][parentIndex] = AST.identifier(newSymbol2);

                after(grandNode[grandProp]);
                ++changes;
                return;
              }
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
