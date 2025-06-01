# Preval test case

# ai_strict_mode_specific_behavior_opaque.md

> Ai > Ai2 > Ai strict mode specific behavior opaque
>
> Test: Strict mode specific behavior (e.g., assign to undeclared).

## Input

`````js filename=intro
// Expected: ReferenceError (as Preval assumes strict).
(function() {
  let result = 'no_error';
  try {
    // undeclaredVar = $('some_value_for_undeclared');
    // Preval should catch this as a ReferenceError before even trying to eval $(...)
    // Let's make it depend on an opaque value to see if it changes things.
    let assign_attempt = function() { undeclaredVar = $('val_strict'); };
    if ($('cond_for_strict_assign', true)) {
       eval("undeclaredGlobalInEval = $('val_for_undeclared_global_in_eval')");
       // This will throw in strict mode if eval code itself is strict, or if outer scope is strict.
       // Preval runs in strict mode context for modules.
    }
    result = 'assign_attempted_no_error'; // Should not be reached
  } catch (e) {
    result = e.name; // Expect ReferenceError
    $('strict_mode_error_details', e.message.includes('undeclaredGlobalInEval') || e.message.includes('undeclaredVar'));
  }
  $('strict_mode_final_result', result);
})();
`````


## Settled


`````js filename=intro
let result /*:unknown*/ = `assign_attempted_no_error`;
try {
  const tmpIfTest /*:unknown*/ = $(`cond_for_strict_assign`, true);
  if (tmpIfTest) {
    eval(`undeclaredGlobalInEval = \$('val_for_undeclared_global_in_eval')`);
  } else {
  }
} catch (e) {
  result = e.name;
  const tmpMCOO /*:unknown*/ = e.message;
  const tmpMCF /*:unknown*/ = tmpMCOO.includes;
  const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `includes`, `undeclaredGlobalInEval`);
  if (tmpCalleeParam) {
    $(`strict_mode_error_details`, tmpCalleeParam);
  } else {
    const tmpMCOO$1 /*:unknown*/ = e.message;
    const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.includes;
    const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `includes`, `undeclaredVar`);
    $(`strict_mode_error_details`, tmpClusterSSA_tmpCalleeParam);
  }
}
$(`strict_mode_final_result`, result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let result = `assign_attempted_no_error`;
try {
  if ($(`cond_for_strict_assign`, true)) {
    eval(`undeclaredGlobalInEval = \$('val_for_undeclared_global_in_eval')`);
  }
} catch (e) {
  result = e.name;
  const tmpMCOO = e.message;
  const tmpCalleeParam = tmpMCOO.includes(`undeclaredGlobalInEval`);
  if (tmpCalleeParam) {
    $(`strict_mode_error_details`, tmpCalleeParam);
  } else {
    const tmpMCOO$1 = e.message;
    $(`strict_mode_error_details`, tmpMCOO$1.includes(`undeclaredVar`));
  }
}
$(`strict_mode_final_result`, result);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "assign_attempted_no_error";
try {
  const b = $( "cond_for_strict_assign", true );
  if (b) {
    eval( "undeclaredGlobalInEval = $('val_for_undeclared_global_in_eval')" );
  }
}
catch (c) {
  a = c.name;
  const d = c.message;
  const e = d.includes;
  const f = $dotCall( e, d, "includes", "undeclaredGlobalInEval" );
  if (f) {
    $( "strict_mode_error_details", f );
  }
  else {
    const g = c.message;
    const h = g.includes;
    const i = $dotCall( h, g, "includes", "undeclaredVar" );
    $( "strict_mode_error_details", i );
  }
}
$( "strict_mode_final_result", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let result = `no_error`;
  try {
    let assign_attempt = function () {
      debugger;
      undeclaredVar = $(`val_strict`);
      return undefined;
    };
    const tmpIfTest = $(`cond_for_strict_assign`, true);
    if (tmpIfTest) {
      eval(`undeclaredGlobalInEval = \$('val_for_undeclared_global_in_eval')`);
    } else {
    }
    result = `assign_attempted_no_error`;
  } catch (e) {
    result = e.name;
    const tmpMCOO = e.message;
    const tmpMCF = tmpMCOO.includes;
    let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `includes`, `undeclaredGlobalInEval`);
    if (tmpCalleeParam) {
      $(`strict_mode_error_details`, tmpCalleeParam);
    } else {
      const tmpMCOO$1 = e.message;
      const tmpMCF$1 = tmpMCOO$1.includes;
      tmpCalleeParam = $dotCall(tmpMCF$1, tmpMCOO$1, `includes`, `undeclaredVar`);
      $(`strict_mode_error_details`, tmpCalleeParam);
    }
  }
  $(`strict_mode_final_result`, result);
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
 - 1: 'cond_for_strict_assign', true
 - 2: 'val_for_undeclared_global_in_eval'
 - 3: 'strict_mode_error_details', true
 - 4: 'strict_mode_final_result', 'ReferenceError'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
