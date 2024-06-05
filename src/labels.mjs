import { ASSERT } from './utils.mjs';
import * as AST from './ast.mjs';

export function createUniqueGlobalLabel(name, fdata) {
  const globallyUniqueLabelRegistry = fdata.globallyUniqueLabelRegistry;

  if (globallyUniqueLabelRegistry.has(name)) {
    // Cache the offset otherwise large inputs will literally test every suffix 1 through n which causes perf problems
    const labelNameSuffixOffset = fdata.labelNameSuffixOffset;

    // No point in having a `foo$1$22$1$1$1$1$1$1$1$1$1$1$1$1$1`
    if (name.includes('$')) {
      name = name.replace(/\$\d+$/, '');
    }

    // Create a (module) globally unique name. Then use that name for the local scope.
    let n = labelNameSuffixOffset.get(name) ?? 0;

    while (globallyUniqueLabelRegistry.has(name + '$' + ++n));
    labelNameSuffixOffset.set(name, n + 1);

    return n ? name + '$' + n : name;
  }

  return name;
}
export function registerGlobalLabel(fdata, name, originalName, labelStatementNode) {
  ASSERT(!fdata.globallyUniqueLabelRegistry.has(name), 'this func should be called with the unique label name. didya forget createUniqueGlobalLabel?');
  ASSERT(labelStatementNode?.type === 'LabeledStatement', 'expecting labeled statement as arg');

  fdata.globallyUniqueLabelRegistry.set(name, {
    // ident meta data
    uid: ++fdata.globalNameCounter,
    originalName,
    uniqueName: name,
    node: labelStatementNode, // This should be the statement node. All referenced labels must exist (syntax error), labels must appear before their usage when traversing
    usages: [], // Only of break/continue statements! {node, block, index}. Note: when not normal, this can't be used because prop is missing.
  });
}

export function updateGlobalLabelStatementRef(fdata, labelStatementNode) {
  fdata.globallyUniqueLabelRegistry.get(labelStatementNode.label.name).node = labelStatementNode;
}

export function createFreshLabelStatement(name, fdata, labelBody) {
  ASSERT(createFreshLabelStatement.length === arguments.length, 'arg count');
  ASSERT(labelBody?.type === 'BlockStatement', 'All labels should have a body and the body should be a block'); // Or do we need exceptions to that rule?

  const tmpName = createUniqueGlobalLabel(name, fdata, false);
  const labelNode = AST.identifier(tmpName);
  const labelStatementNode = AST.labeledStatement(labelNode, labelBody);
  registerGlobalLabel(fdata, tmpName, tmpName, labelStatementNode);
  return labelStatementNode;
}

export function addLabelReference(fdata, labelNode, block, index, fromPrepareOrOncePhase = false) {
  ASSERT(labelNode?.type === 'Identifier', 'labels are idents');
  ASSERT(fromPrepareOrOncePhase || Array.isArray(block), 'should receive the block body, not block statements', block);
  const usages = fdata.globallyUniqueLabelRegistry.get(labelNode.name).usages;
  for (const obj of usages) {
    if (obj.node === labelNode) {
      obj.block = block;
      obj.index = index;
      return;
    }
  }
  usages.push({node: labelNode, block, index});
}

export function removeLabelReference(fdata, labelNode) {
  ASSERT(labelNode?.type === 'Identifier', 'the label node is actually an identifier');
  const labelMeta = fdata.globallyUniqueLabelRegistry.get(labelNode.name);
  const usages = labelMeta.usages;

  for (let i=0; i<labelMeta.usages.length; ++i) {
    if (labelNode === labelMeta.usages[i].node) {
      labelMeta.usages.splice(i, 1);
      break;
    }
  }
  for (const obj of usages) ASSERT(obj.node !== labelNode);
}
