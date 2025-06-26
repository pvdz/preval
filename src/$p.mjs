// Create the $p object

let uid = 0;

export function resetUid() {
  uid = 0;
}
export function getUid() {
  return uid;
}

// Note: a $p is always set when creating a node. It is also set to blank when in the before visitor of any node in phase1
export function $p() {
  // Notes:
  // - pids should be unique across all nodes (there are various assertions making sure this stays)
  // - pids offset at 1, so they can be falsy checked
  // - pids are incremental in nature in VISIT order, NOT SOURCE order
  //   - important: this may diverge if normalization injects a new node
  //   - normalization/phase1 should NOT rely on this order property. phase1 will try to fix the order after which it's fine again.
  // - there may be gaps between pids even sibling/traversal nodes (although this should be corrected after phase1..?)
  const pid = ++uid; // offset 1

  return {
    // @deprecated in favor of npid
    // get pid() { console.trace('Warning: accesses old pid'); return String(pid); }, // string.
    npid: pid, // number

    // Add properties here in a comment but not actually (you would do this for perf) because it makes debugging more noisy

    // prepare/normalize (set during this phase but these props may not yet exist due to new nodes or traversal order)
    // - pid, string, deprecated. mostly in visit order but not guaranteed.
    // - npid, number. mostly in visit order but not guaranteed.
    // - lexScopeId // number. Debug. Every node with a $scope gets its own unique lexical scope id (phase1)
    // - nameMapping: undefined, // Map. Scope tracking for nodes that have a scope
    // - thisAccess: undefined, // boolean. For functions (not arrows), whether it access `this` anywhere in its own scope. Includes whether nested arrows access this in its scope. But not nested functions
    // - uniqueName // string. Globally unique name for this binding name. Phase1 will sort out scoping problems and assign each unique binding a globally unique name (its original name with possibly a suffix to distinct it)
    // - originalLabelName // string. Name of a label before making it unique
    // - isForAlias // bool. is this identifier used as part of the alias for this/arguments/arguments.length ?
    // - funcHeader // bool. during normalize_once, this prevents a debugger statement from being deleted if it isn't ours
    // - hoistedVars // Array<[node, parent, prop, index, exportIndex]> Allows a one-time pass at hoisting by passing on all relevant information through this array
    // - isBlockFuncDecl // bool. Is the node that is a FunctionDeclaration nested in a block (but not a func body)?
    // - doesBreak // bool. Does this loop/switch have any break statement?
    // - doesContinue // bool. Does this loop have any continue statement?
    // - regularBreaks // Array<Node>. For breakable nodes (switch,loops,etc). Contains unlabeled break nodes nested directly in it.
    // - hasMiddleDefaultCase // bool. For switch. True iif it contains a regular case that follows a default case
    // - completesAbrupt // bool. For any node that can contain other nodes. This is true if that node has a child node that is continue/break/return/throw. The IfStatement has two specific properties for each branch. Other multi-child-block capable nodes like `try` should not look at this or be fixed to support it.
    // - completesAbruptConsequent // bool. For IfStatement nodes. Need this to distinguish between consequent and alternate.
    // - completesAbruptAlternate // bool. For IfStatement nodes. Need this to distinguish between consequent and alternate.
    // - newAbrupt // bool, because I like tech debt. checked and used in normal_once phase for finally transform.
    // - parentLabel // string|undefined. Only in normal_once, only for loop nodes. If this is a labeled loop (for continues) then this is the name. Used to get rid of continue.

    // - returnBreakThrow // 'return' | 'break' | 'throw', used for dce in normalize

    // phase1 (always re-creates $p from scratch). these props should exist after phase1/1.1/1.2 ...)
    // - pid, string, deprecated. in visitation order (guaranteed)
    // - npid, number. in visitation order (guaranteed)
    // - hasFuncDecl // bool. Prevent elimination of blocks containing function declarations
    // - readsArgumentsLen // bool. Does it read `arguments.length`?
    // - readsArgumentsLenAs // string. Name of the alias of `arguments.length` in this function, if any. note: when arguments.length is a statement, it is "used" but there is no alias
    // - readsArgumentsLenAt // int. Block index of the args.len alias
    // - readsArgumentsAny // bool. Does it read the implicit `arguments` in any way?
    // - readsArgumentsAs // string. name of the `arguments` alias for this function. if any. note: when arguments is a statement, it is "used" but there is no alias
    // - containsFunctions // bool. Does a function body contain nested functions (anywhere of any kind)?
    // - unqualifiedLabelUsages // Array<node>. Should contain loop and/or switch nodes. When finding an unqualified break/continue, this tells you where it jumps to.
    // - alwaysCompletes // Set<number>. All code paths complete explicitly and this set tells you the pids where they break to (there may be multiple in case of `If`). We need pids so parent Label nodes know to remove their own pid from this set when they see it.
    // - commonReturn // node | null | undefined. A fresh node (one!) that depicts the value being returned by all return points. This node should be simple so it's an ident or a literal. If no return has been seen yet, this value is undefined. If not all returns have the same value, this value will be null. Otherwise it'll be a fresh AST node (ident/lit/unary<primitive>).
    // - returnNodes // Array<node>. All return nodes for this function
    // - hasBranch // bool. Does this function contain an `if`, `while`, or `for-x` statement?
    // - funcDepth // number. Debug. How many nested scopes does this node appear in
    // - bodyOffset // number. On funcNode. First body statement after the function header (after the debugger statement). Discovered while walking a function, not maintained
    // - promoParent // node|null. The parent node of this block. Used for function scope promotion.
    // - ownBindings // Set<string>. Set of all local bindings in a function scope (may be defined in a block). Excludes the custom $$1 params names.
    // - blockChain // string. Always ends with trailing comma. For all nodes (from phase1), the block chain of this function, including the trailing zero for this function. Same as for refs.
    // - funcChain // string. For functions, the ids of parent functions (and global) up to and including this function. Same as for read/write refs.
    // - paramNames // Array<string>. functions, 1:1 with funcNode.params. Holes for unused params. phase1. Param names for the function params. Should be in same order but may have holes if certain params are not actually used. Always check existence. Always set by index, don't push/pop.
    // - primitiveNodeValue // any. When AST.isPrimitive(node) is true this could be the value. otherwise ignore.
    // - lastPid // number. All nodes. Last pid of child node. Note: if it has no child-nodes then pid==lastPid.
    // - paramVarDeclRef // for func.params (only), the local binding var decl for this param if present, available after phase1, { blockBody, blockIndex, name }. false if set by phase1 but not used. if undefined then it hasnt gone through phase1 yet.
    // - usesAwait // bool, func nodes. Set to true when at least one `await` usage was seen in this node
    // - usesYield // bool, func nodes. Set to true when at least one `yield` usage was seen in this node

    // - predictable // bool. in freeing only; statements only; tells you whether the statement is predictable or not. this obviously excludes the reference check, purely the statement itself (and any expressions referenced).
  };
}
