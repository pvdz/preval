# Preval test case

# ai_direct_vs_indirect_eval_opaque_content.md

> Ai > Ai2 > Ai direct vs indirect eval opaque content
>
> Test: Direct vs indirect eval with opaque string.

## Input

`````js filename=intro
// Expected: Scope differences if modeled (direct=local, indirect=global). Preval may not distinguish.
(function () {
  let localVar = $('local_var_val', 'local_scope_val');
  let code_str = $('opaque_eval_code_scope', "localVar = $('new_val_for_localVar', 'modified_in_eval'); $('eval_localVar_val', localVar);");

  try {
    eval(code_str); // Direct eval
    $('direct_eval_localVar_after', localVar);
  } catch (e) { $('direct_eval_error', e.name); }

  localVar = $('local_var_reset', 'local_scope_reset_val'); // Reset for indirect eval test
  try {
    let indirectEval = eval; // Alias to ensure indirect call path
    indirectEval(code_str); // Indirect eval through alias
    // (0, eval)(code_str); // Another way for indirect eval
    $('indirect_eval_localVar_after', localVar); // Should be unchanged if indirect eval targets global
    // To check global: $('global_eval_check', globalThis.localVar === 'modified_in_eval');
  } catch (e) { $('indirect_eval_error', e.name); }
})();
`````


## Settled


`````js filename=intro
const localVar /*:unknown*/ = $(`local_var_val`, `local_scope_val`);
const code_str /*:unknown*/ = $(
  `opaque_eval_code_scope`,
  `localVar = \$('new_val_for_localVar', 'modified_in_eval'); \$('eval_localVar_val', localVar);`,
);
try {
  eval(code_str);
  $(`direct_eval_localVar_after`, localVar);
} catch (e) {
  const tmpCalleeParam /*:unknown*/ = e.name;
  $(`direct_eval_error`, tmpCalleeParam);
}
const tmpClusterSSA_localVar /*:unknown*/ = $(`local_var_reset`, `local_scope_reset_val`);
try {
  eval(code_str);
  $(`indirect_eval_localVar_after`, tmpClusterSSA_localVar);
} catch (e$1) {
  const tmpCalleeParam$1 /*:unknown*/ = e$1.name;
  $(`indirect_eval_error`, tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const localVar = $(`local_var_val`, `local_scope_val`);
const code_str = $(
  `opaque_eval_code_scope`,
  `localVar = \$('new_val_for_localVar', 'modified_in_eval'); \$('eval_localVar_val', localVar);`,
);
try {
  eval(code_str);
  $(`direct_eval_localVar_after`, localVar);
} catch (e) {
  $(`direct_eval_error`, e.name);
}
const tmpClusterSSA_localVar = $(`local_var_reset`, `local_scope_reset_val`);
try {
  eval(code_str);
  $(`indirect_eval_localVar_after`, tmpClusterSSA_localVar);
} catch (e$1) {
  $(`indirect_eval_error`, e$1.name);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "local_var_val", "local_scope_val" );
const b = $( "opaque_eval_code_scope", "localVar = $('new_val_for_localVar', 'modified_in_eval'); $('eval_localVar_val', localVar);" );
try {
  eval( b );
  $( "direct_eval_localVar_after", a );
}
catch (c) {
  const d = c.name;
  $( "direct_eval_error", d );
}
const e = $( "local_var_reset", "local_scope_reset_val" );
try {
  eval( b );
  $( "indirect_eval_localVar_after", e );
}
catch (f) {
  const g = f.name;
  $( "indirect_eval_error", g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let localVar = $(`local_var_val`, `local_scope_val`);
  let code_str = $(
    `opaque_eval_code_scope`,
    `localVar = \$('new_val_for_localVar', 'modified_in_eval'); \$('eval_localVar_val', localVar);`,
  );
  try {
    eval(code_str);
    $(`direct_eval_localVar_after`, localVar);
  } catch (e) {
    let tmpCalleeParam = e.name;
    $(`direct_eval_error`, tmpCalleeParam);
  }
  localVar = $(`local_var_reset`, `local_scope_reset_val`);
  try {
    let indirectEval = eval;
    eval(code_str);
    $(`indirect_eval_localVar_after`, localVar);
  } catch (e$1) {
    let tmpCalleeParam$1 = e$1.name;
    $(`indirect_eval_error`, tmpCalleeParam$1);
  }
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'local_var_val', 'local_scope_val'
 - 2: 'opaque_eval_code_scope', "localVar = $('new_val_for_localVar', 'modified_in_eval'); $('eval_localVar_val', localVar);"
 - 3: 'direct_eval_error', 'ReferenceError'
 - 4: 'local_var_reset', 'local_scope_reset_val'
 - 5: 'indirect_eval_error', 'ReferenceError'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
