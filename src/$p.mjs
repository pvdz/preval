// Create the $p object

let uid = 0;
export function $p() {
  let pid = String(++uid);

  return {
    pid, // Incremental unique id (may have gaps between consecutive nodes but will be unique)
    explicitReturns: '', // '','yes','no'. Set if the node is a branching type where it matters

    // Add properties here in a comment but not actually (you would do this for perf) because it makes debugging more noisy

    // phase1 (these props may not exist due to new nodes)
    //lexScopeId // number. Every node with a $scope gets its own unique lexical scope id (phase1)
    //nameMapping: undefined, // Map. Scope tracking for nodes that have a scope
    //scopeBinding: undefined, // Reference to nearest func/global map. Global/func nodes get a fresh Map.
    //scope: undefined, // Only functions get this (not arrows, not global)
    //thisAccess: undefined, // boolean. For functions (not arrows), whether it access `this` anywhere in its own scope. Includes whether nested arrows access this in its scope. But not nested functions
    //parentScope // Object. parent function stack or global scope. Program has this null.
    //uniqueName // string. Globally unique name for this binding name. Phase1 will sort out scoping problems and assign each unique binding a globally unique name (its original name with possibly a suffix to distinct it)

    // phase2 (these props should exist after phase2... even on new nodes)
    // pure // boolean. For functions, whether the function does anything that might have observable side effects beyond the return value.
    // returns // Array<node> | undefined. For functions, all its return nodes. Implicit return adds undefined here.
    // oneReturnValue // any. The node being returned.
    // replaceWith // any. The call to this pure function should be replaced with this node.
    // varBindingsToInject // Array<node>. Var statements to inject at the top of a function/program node. Func decls will still precede it.
    // funcBindingsToInject // Array<node>. Func decls to inject at the top of a function/program node. Order can be relevant (two funcs with same id).
  };
}
