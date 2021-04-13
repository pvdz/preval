// Create the $p object

let uid = 0;

export function resetUid() {
  uid = 0;
}

export function $p() {
  let pid = String(++uid);

  return {
    pid, // Incremental unique id (may have gaps between consecutive nodes but will be unique)

    // Add properties here in a comment but not actually (you would do this for perf) because it makes debugging more noisy

    // phase1 (these props may not exist due to new nodes)
    // - lexScopeId // number. Debug. Every node with a $scope gets its own unique lexical scope id (phase1)
    // - nameMapping: undefined, // Map. Scope tracking for nodes that have a scope
    // - thisAccess: undefined, // boolean. For functions (not arrows), whether it access `this` anywhere in its own scope. Includes whether nested arrows access this in its scope. But not nested functions
    // - uniqueName // string. Globally unique name for this binding name. Phase1 will sort out scoping problems and assign each unique binding a globally unique name (its original name with possibly a suffix to distinct it)
    // - originalLabelName // string. Name of a label before making it unique
    // - isForAlias // bool. is this identifier used as part of the alias for this/arguments/arguments.length ?
    // - funcHeader // bool. during normalize_once, this prevents a debugger statement from being deleted if it isn't ours

    // phase2 (these props should exist after phase2... even on new nodes)
    // - hoistedVars // Array<[node, parent, prop, index, exportIndex]> Allows a one-time pass at hoisting by passing on all relevant information through this array
    // - isBlockFuncDecl // bool. Is the node that is a FunctionDeclaration nested in a block (but not a func body)?
    // - hasFuncDecl // bool. Prevent elimination of blocks containing function declarations
    // - readsArgumentsLen // bool. Does it read `arguments.length`?
    // - readsArgumentsAny // bool. Does it read the implicit `arguments` in any way?
    // - containsFunctions // bool. Does a function body contain nested functions (anywhere of any kind)?
    // - unqualifiedLabelUsages // Array<node>. Should contain loop and/or switch nodes. When finding an unqualified break/continue, this tells you where it jumps to.
    // - earlyComplete // bool. Not for global. Does this function contain an early completion? A return or throw that is not at the end of the function? (break/continue do not stop a function, await/yield are not yet supported)
    // - earlyReturn // bool. Not for global. Does this function contain a return statement that is not its last statement?
    // - earlyThrow // bool. Not for global. Does this function contain a throw statement that is not its last statement?
    // - commonReturn // node | null | undefined. A fresh node (one!) that depicts the value being returned by all return points. This node should be simple so it's an ident or a literal. If no return has been seen yet, this value is undefined. If not all returns have the same value, this value will be null. Otherwise it'll be a fresh AST node (ident/lit).
    // - throwsExplicitly // bool.
    // - hasBranch // bool. Does this function contain an `if`, `while`, or `for-x` statement?
    // - funcDepth // number. Debug. How many nested scopes does this node appear in
    // - oneTimerDirty // bool. Mark a function as having something inlined into it. This invalidates references and requires another phase1 pass before being able to inline the function itself safely.
    // - bodyOffset // number. First body statement after the function header (after the debugger statement). Discovered while walking a function, not maintained
    // - promoParent // node|null. The parent node of this block. Used for function scope promotion.
  };
}
