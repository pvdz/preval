import walk from '../../lib/walk.mjs';

export function phase2(ast) {
  walk((node, before, nodeType, path) => {

    switch (nodeType + ':' + (before ? 'before' : 'after')) {

    }



  }, ast, 'ast')
}
