// Create the $p object

let uid = 0;

export function resetUid() {
  uid = 0;
}
export function getUid() {
  return uid;
}

export function $p() {
  let pid = String(++uid);

  return {
    pid, // Incremental unique non-zero id (may have gaps between consecutive nodes but will be unique)

    // Add properties here in a comment but not actually (you would do this for perf) because it makes debugging more noisy

    // prepare/normalize (these props may not exist due to new nodes)
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
    // - redundantLabel // bool. For break/continue statements. Should the label be droppable?
    // - regularBreaks // Array<Node>. For breakable nodes (switch,loops,etc). Contains unlabeled break nodes nested directly in it.
    // - hasMiddleDefaultCase // bool. For switch. True iif it contains a regular case that follows a default case
    // - completesAbrupt // bool. For any node that can contain other nodes. This is true if that node has a child node that is continue/break/return/throw. The IfStatement has two specific properties for each branch. Other multi-child-block capable nodes like `try` should not look at this or be fixed to support it.
    // - completesAbruptConsequent // bool. For IfStatement nodes. Need this to distinguish between consequent and alternate.
    // - completesAbruptAlternate // bool. For IfStatement nodes. Need this to distinguish between consequent and alternate.
    // - newAbrupt // bool, because I like tech debt. checked and used in normal_once phase for finally transform.

    // reduce/phase2 (these props should exist after phas1... even on new nodes)
    // - hasFuncDecl // bool. Prevent elimination of blocks containing function declarations
    // - readsArgumentsLen // bool. Does it read `arguments.length`?
    // - readsArgumentsLenAs // string. Name of the alias, if any
    // - readsArgumentsLenAt // int. Block index of the args.len alias
    // - readsArgumentsAny // bool. Does it read the implicit `arguments` in any way?
    // - containsFunctions // bool. Does a function body contain nested functions (anywhere of any kind)?
    // - unqualifiedLabelUsages // Array<node>. Should contain loop and/or switch nodes. When finding an unqualified break/continue, this tells you where it jumps to.
    // - earlyComplete // bool. Does this block/function contain an early completion? A return or throw that is not at the end of the function? (break/continue do not stop a function, await/yield are not yet supported). For `if`, true if at least one branch does.
    // - earlyReturn // bool. Does this statement/function contain a return statement that is not its last statement? For `if`, true if at least one branch does.
    // - earlyThrow // bool. Does this statement/function contain a throw statement that is not its last statement? For `if`, true if at least one branch does.
    // - alwaysComplete // bool. Does this statement/function always complete explicitly (return/throw)? Even if early. For `if`, only true if both branches do.
    // - alwaysReturn // bool. Does this statement/function always return explicitly? False if it also throws or returns implicitly. Even if early. For `if`, only true if both branches do.
    // - alwaysThrow // bool. Does this statement/function always throw? Even if early. False if it also returns im/explicitly. For `if`, only true if both branches do.
    // - commonReturn // node | null | undefined. A fresh node (one!) that depicts the value being returned by all return points. This node should be simple so it's an ident or a literal. If no return has been seen yet, this value is undefined. If not all returns have the same value, this value will be null. Otherwise it'll be a fresh AST node (ident/lit/unary<primitive>).
    // - returnNodes // Array<node>. All return nodes for this function
    // - throwsExplicitly // bool.
    // - hasBranch // bool. Does this function contain an `if`, `while`, or `for-x` statement?
    // - funcDepth // number. Debug. How many nested scopes does this node appear in
    // - oneTimerDirty // bool. Mark a function as having something inlined into it. This invalidates references and requires another phase1 pass before being able to inline the function itself safely.
    // - bodyOffset // number. First body statement after the function header (after the debugger statement). Discovered while walking a function, not maintained
    // - promoParent // node|null. The parent node of this block. Used for function scope promotion.
    // - ownBindings // Set<string>. Set of all local bindings in a function scope (may be defined in a block). Excludes the custom $$1 params names.
    // - blockChain // string. For functions, the block chain of this function, including the trailing zero for this function. Same as for refs.
    // - funcChain // string. For functions, the ids of parent functions (and global) up to and including this function. Same as for refs.
    // - paramNames // Array<string>. Original param names for the function. Those will be $$0 mapped in the same order.
    // - isPrimitive // bool. For binary expression operand nodes
    // - primitiveValue // any. When isPrimitive is true, this should be the value. otherwise ignore.
    // - lastPid // number. Block nodes. Last pid inside the block. Same as block if the block is empty.
  };
}
