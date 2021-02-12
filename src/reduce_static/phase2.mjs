import walk from '../../lib/walk.mjs';

export function phase2(program, fdata, resolve, req) {
  walk(
    (node, before, nodeType, path) => {
      switch (nodeType + ':' + (before ? 'before' : 'after')) {
      }
    },
    fdata.tenkoOutput.ast,
    'ast',
  );

  return false;
}
