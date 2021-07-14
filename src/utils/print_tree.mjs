import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd } from '../utils.mjs';

export function printAST(node, prop) {
  walk(
    (node, down, type, path) => {
      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      const parentIndex = path.indexes[path.indexes.length - 1];
      if (down) {
        if (!node) return console.log(null);

        if (parentIndex >= 0) group();
        log(node.type + ':' + node.$p.pid);
      } else {
        if (parentIndex >= 0) groupEnd();
      }
    },
    node,
    prop,
  );
}
