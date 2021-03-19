// Create the $p object

let uid = 0;
export function $p() {
  let pid = String(++uid);

  return {
    pid, // Incremental unique id (may have gaps between consecutive nodes but will be unique)

    // Add properties here in a comment but not actually (you would do this for perf) because it makes debugging more noisy

    // phase1 (these props may not exist due to new nodes)
    //lexScopeId // number. Every node with a $scope gets its own unique lexical scope id (phase1)
    //nameMapping: undefined, // Map. Scope tracking for nodes that have a scope
    //scopeBinding: undefined, // Reference to nearest func/global map. Global/func nodes get a fresh Map.
    //scope: undefined, // Only functions get this (not arrows, not global)
    //thisAccess: undefined, // boolean. For functions (not arrows), whether it access `this` anywhere in its own scope. Includes whether nested arrows access this in its scope. But not nested functions
    //uniqueName // string. Globally unique name for this binding name. Phase1 will sort out scoping problems and assign each unique binding a globally unique name (its original name with possibly a suffix to distinct it)
    //originalLabelName // string. Name of a label before making it unique
    // isForAlias // bool. is this identifier used as part of the alias for this/arguments/arguments.length ?

    // phase2 (these props should exist after phase2... even on new nodes)
    // pure // boolean. For functions, whether the function does anything that might have observable side effects beyond the return value.
    // returns // Array<node> | undefined. For functions, all its return nodes. Implicit return adds undefined here.
    // oneReturnValue // any. The node being returned.
    // replaceWith // any. The call to this pure function should be replaced with this node.
    // varBindingsToInject // Array<node>. Var statements to inject at the top of a function/program node. Func decls will still precede it.
    // funcBindingsToInject // Array<node>. Func decls to inject at the top of a function/program node. Order can be relevant (two funcs with same id).
    // hoistedVars // Array<[node, parent, prop, index, exportIndex]> Allows a one-time pass at hoisting by passing on all relevant information through this array
    // isBlockFuncDecl // bool. Is the node that is a FunctionDeclaration nested in a block (but not a func body)?
    // hasFuncDecl // bool. Prevent elimination of blocks containing function declarations
    // readsArgumentsLen // bool. Does it read `arguments.length`?
    // readsArgumentsAny // bool. Does it read the implicit `arguments` in any way?
    // containsFunctions // bool. Does a function body contain nested functions (anywhere of any kind)?
    // unqualifiedLabelUsages // Array<node>. Should contain loop and/or switch nodes. When finding an unqualified break/continue, this tells you where it jumps to.
    // earlyReturn // bool. Does this function contain a return statement that is not its last statement?
    // hasBranch // bool. Does this function contain an `if`, `while`, or `for-x` statement?
    // funcDepth // number. How many nested scopes does this node appear in
    // oneTimerDirty // bool. Mark a function as having something inlined into it. This invalidates references and requires another phase1 pass before being able to inline the function itself safely.
  };
}
