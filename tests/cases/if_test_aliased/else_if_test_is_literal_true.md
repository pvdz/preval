# Preval test case

# else_if_test_is_literal_true.md

> If test aliased > Else if test is literal true
>
> `if(true)`, so `else` branch is conceptually dead. Alias `a = !c` is in `else`.

## Input

`````js filename=intro
// This test verifies that the rule doesn't incorrectly transform `a` based on `if(true)`,
// as the `ifTestName` (if any from `true`) wouldn't match `c` from `a = !c`.
let c = $(false); // `c` is false, so `!c` (alias `a`) is true.
let a = !c;
if (true) { // Test condition is literally true
  // ...
} else {
  $(a); // If this branch exists in AST, `a` should become `true` because `c` is false.
        // This `else` is effectively `if (!true)` which means `c` in `a=!c` is not the `true`.
        // The `ifTestName` is what's critical. This test is tricky. `ifTestName` is not `c`.
        // This case should NOT transform `a` based on `if(true)` because `a` is `!c` not `!true`.
}

// Expected: No transformation of `a` by this rule specific to `if(true)`.
// let c = $(false);
// let a = !c;
// if (true) {
//   // ...
// } else {
//   $(a);
// }
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
let a = !c;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
