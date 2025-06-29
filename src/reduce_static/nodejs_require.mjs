// Find the special 'require' symbols and replace them with a custom value.
// This offers support for nodejs builtins without risking running any of it.
// These symbols are not exposed in the test runner so there should be no way to leak them.
// I expect things in this file to be able to be done in normalization. But I think it's good to consolidate them here.
//
//        `$require_os.hostname`
// ->
//        `fake_hostname.local`
//

import {
  after,
  ASSERT,
  before,
  currentState,
  example,
  group,
  groupEnd,
  hackyRule,
  log,
  vgroup,
  vgroupEnd,
  vlog,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { NODEJS_REQUIRE, symbo } from '../symbols_builtins.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { RED, RESET } from '../constants.mjs';

// Manually set it up for cases.
const CONFIG = {
  enabled: false, // deadmansswitch for inlining all data bits. it wont prevent transforming nodejs require stuff.

  platform: undefined, // linux, windows, darwin
  homedir: '/PREVAL_FAKE_HOME/PREVAL_FAKE_HOMEDIR',
  hostname: 'PREVAL_FAKE_HOSTNAME',
  tmpdir: '/PREVAL_FAKE_TMP',
};

export function nodejsRequire(fdata) {
  group('\n\n\n[nodejsRequire] Finding static param ops to outline\n');
  // currentState(fdata, 'nodejsRequire', true, fdata);
  const r = _nodejsRequire(fdata);
  groupEnd();
  return r;
}
function _nodejsRequire(fdata) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (NODEJS_REQUIRE.has(varName)) return processRequireSymbol(meta, varName);
    if (varName === 'require' && meta.isBuiltin) return processRequireCall(meta);
  });

  function processRequireCall(meta) {
    vgroup('- Have a reference to `require`')
    meta.reads.forEach(read => {
      if (read.parentNode.type !== 'CallExpression') return;
      if (read.parentProp !== 'callee') return;
      if (read.parentNode.arguments.length !== 1) return;
      if (!AST.isStringLiteral(read.parentNode.arguments[0])) return;
      const pkg = AST.getPrimitiveValue(read.parentNode.arguments[0]);
      vlog('- calling single package named:', pkg);
      switch (pkg) {
        case 'os':
        case 'node:os': {
          hackyRule('Calling require with os becomes symbol');
          example('require("os")', '$require_os');
          before(read.blockBody[read.blockIndex]);

          read.grandNode[read.grandProp] = AST.identifier(symbo('require', 'os'));

          after(read.blockBody[read.blockIndex]);
          changes = changes + 1;
          break;
        }
        case 'fs':
        case 'node:fs': {
          hackyRule('Calling require with fs becomes symbol');
          example('require("fs")', '$require_fs');
          before(read.blockBody[read.blockIndex]);

          read.grandNode[read.grandProp] = AST.identifier(symbo('require', 'fs'));

          after(read.blockBody[read.blockIndex]);
          changes = changes + 1;
          break;
        }
        case 'fs/promises':
        case 'node:fs/promises': {
          hackyRule('Calling require with fs/promises becomes symbol');
          example('require("fs/promises")', '$require_fs_promises');
          before(read.blockBody[read.blockIndex]);

          read.grandNode[read.grandProp] = AST.identifier(symbo('require', 'fs_promises'));

          after(read.blockBody[read.blockIndex]);
          changes = changes + 1;
          break;
        }
        case 'path':
        case 'node:path': {
          hackyRule('Calling require with path becomes symbol');
          example('require("path")', '$require_path');
          before(read.blockBody[read.blockIndex]);

          read.grandNode[read.grandProp] = AST.identifier(symbo('require', 'path'));

          after(read.blockBody[read.blockIndex]);
          changes = changes + 1;
          break;
        }
        case 'child_process':
        case 'node:child_process': {
          hackyRule('Calling require with child_process becomes symbol');
          example('require("child_process")', '$require_child_process');
          before(read.blockBody[read.blockIndex]);

          read.grandNode[read.grandProp] = AST.identifier(symbo('require', 'child_process'));

          after(read.blockBody[read.blockIndex]);
          changes = changes + 1;
          break;
        }
        case 'request':
        case 'node:request': {
          hackyRule('Calling require with request becomes symbol');
          example('require("request")', '$require_request');
          before(read.blockBody[read.blockIndex]);

          read.grandNode[read.grandProp] = AST.identifier(symbo('require', 'request'));

          after(read.blockBody[read.blockIndex]);
          changes = changes + 1;
          break;
        }
      }
    });
    vgroupEnd();
  }

  function processRequireSymbol(meta, varName) {
    meta.reads.forEach(read => {
      if (read.parentNode.type === 'MemberExpression' && read.parentProp === 'object' && !read.parentNode.computed) {
        // property read, `$require_os.hostname`
        if (
          varName === symbo('require', 'os') && NODEJS_REQUIRE.has(symbo('require_os', read.parentNode.property.name)) ||
          varName === symbo('require', 'path') && NODEJS_REQUIRE.has(symbo('require_path', read.parentNode.property.name)) ||
          varName === symbo('require', 'child_process') && NODEJS_REQUIRE.has(symbo('require_child_process', read.parentNode.property.name)) ||
          varName === symbo('require', 'request') && NODEJS_REQUIRE.has(symbo('require_request', read.parentNode.property.name)) ||
          varName === symbo('require', 'fs') && NODEJS_REQUIRE.has(symbo('require_fs', read.parentNode.property.name)) ||
          varName === symbo('require', 'fs_promises') && NODEJS_REQUIRE.has(symbo('require_fs_promises', read.parentNode.property.name))
        ) {
          hackyRule('Replacing prop read on a require() symbol with the symbol for that property');
          example('$require_os.hostname', '$require_os_hostname');
          before(read.blockBody[read.blockIndex]);

          const newSymbo =
            varName === symbo('require', 'os')
            ? symbo('require_os', read.parentNode.property.name)
            : varName === symbo('require', 'path')
            ? symbo('require_path', read.parentNode.property.name)
            : varName === symbo('require', 'fs')
            ? symbo('require_fs', read.parentNode.property.name)
            : varName === symbo('require', 'fs_promises')
            ? symbo('require_fs_promises', read.parentNode.property.name)
            : varName === symbo('require', 'child_process')
            ? symbo('require_child_process', read.parentNode.property.name)
            : varName === symbo('require', 'request')
            ? symbo('require_request', read.parentNode.property.name)
            : ASSERT(false);

          read.grandNode[read.grandProp] = AST.identifier(newSymbo);

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return true;
        }
      }
      else if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
        switch (varName) {
          case symbo('require_os', 'homedir'): {
            if (CONFIG.enabled) {
              hackyRule('Replacing os.homedir() with custom value');
              example('$require_os_homedir()', '"somevalue"');
              before(read.blockBody[read.blockIndex]);

              read.grandNode[read.grandProp] = AST.primitive(CONFIG.homedir);

              after(read.blockBody[read.blockIndex]);
              changes += 1;
              return true;
            }
            break;
          }
          case symbo('require_os', 'hostname'): {
            if (CONFIG.enabled) {
              hackyRule('Replacing os.hostname() with custom value');
              example('$require_os_hostname()', '"somevalue"');
              before(read.blockBody[read.blockIndex]);

              read.grandNode[read.grandProp] = AST.primitive(CONFIG.hostname);

              after(read.blockBody[read.blockIndex]);
              changes += 1;
              return true;
            }
            break;
          }
          case symbo('require_os', 'platform'): {
            // Note: this may cause certain parts of the input code to be dropped as dead (only showing windows or linux code etc)

            if (CONFIG.enabled && CONFIG.platform) {
              hackyRule('Replacing os.platform() with custom value');
              example('$dotCall(xyz, $require_os, "platform")', '"somevalue"');
              before(read.blockBody[read.blockIndex]);

              read.grandNode[read.grandProp] = AST.primitive(CONFIG.platform);

              after(read.blockBody[read.blockIndex]);
              changes += 1;
              return true;
            }
            break;
          }
          case symbo('require_os', 'tmpdir'): {
            if (CONFIG.enabled) {
              hackyRule('Replacing os.tmpdir() with custom value');
              example('$require_os_tmpdir()', '"somevalue"');
              before(read.blockBody[read.blockIndex]);

              read.grandNode[read.grandProp] = AST.primitive(CONFIG.tmpdir);

              after(read.blockBody[read.blockIndex]);
              changes += 1;
              return true;
            }
            break;
          }
          case symbo('require_path', 'dirname'): {
            if (read.parentNode.arguments.length === 1 && AST.isStringLiteral(read.parentNode.arguments[0])) {
              const input = AST.getPrimitiveValue(read.parentNode.arguments[0]);

              // This was chatgpt's "basic" version. we don't need to be fully compliant, i think.
              function gptDirname(path) {
                if (typeof path !== "string") path = String(path);
                if (path.length === 0) return '.';

                // Find last path separator, either / or \
                const hasWinSep = path.lastIndexOf('\\') > path.lastIndexOf('/');
                const sep = hasWinSep ? '\\' : '/';
                let i = path.lastIndexOf(sep);

                // Handle cases like: 'C:\foo', 'foo', '\foo', '/foo'
                if (i === -1) {
                  // For Windows paths like 'C:foo', return drive letter
                  if (hasWinSep && path.length > 1 && path[1] === ':') return path.slice(0, 2);
                  return '.';
                }

                // Remove trailing separators except for root
                while (i > 0 && path[i - 1] === sep) i--;

                if (i === 0) return path[0];
                return path.slice(0, i);
              }
              const output = gptDirname(input);
              console.log(RED + `path.dirname("${input}" = "${output}"` + RESET);

              hackyRule('Calling path.dirname() with a string can be resolved');
              example('$require_path_dirname("/a/b/c.js)', '"/a/b"');
              before(read.blockBody[read.blockIndex]);

              read.grandNode[read.grandProp] = AST.primitive(output);

              after(read.blockBody[read.blockIndex]);
              changes += 1;
              return true;
            }
            break;
          }
        }
      }
    });
  }

  if (changes) {
    log('NodeJS symbols replaced:', changes, '. Restarting from phase1\n');

    return {what: 'nodejsRequire', changes: changes, next: 'phase1'};
  }
  log('NodeJS symbols replaced: 0.\n');
}

function isMethodCallContext(read) {
  return (
    read.parentNode.type === 'CallExpression' &&
    read.parentNode.callee.type === 'Identifier' &&
    read.parentNode.callee.name === SYMBOL_DOTCALL &&
    read.parentProp === 'arguments' &&
    read.parentIndex === 1 // context arg of dotcall
  );
}