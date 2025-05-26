# Preval test case

# if_fold_ternary_const_hard_61.md

> If test merging > If fold ternary const hard 61
>
> Hard Case 61: NO CHANGE (likely crash for Preval) - let y = !x; let x = ... (TDZ for x)

## Input

`````js filename=intro
// This code will crash at runtime before `let y = !x` can be evaluated properly.
// let y = !x; // x is in TDZ if this is module scope
// let x = $(true);

// To make it runnable for testing the rule structure if Preval somehow proceeds:
// Let's simulate x being available but from an outer scope, and a new x declared later.
let outer_x = $(true);
let y = !outer_x; // y depends on outer_x

if (outer_x) { // controlIf based on outer_x
    y = true;
} else {
    // y not reassigned
}

let x = $(false); // New x declared AFTER controlIf and y-init. This x is irrelevant.

// The targetIf(y) should be processed based on outer_x behavior.
// This should be Scenario C for y based on outer_x.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (SCENARIO C based on outer_x):
let outer_x = $(true);
let y = !outer_x;
if (outer_x) {
    y = true;
} else {}
let x = $(false);
{ // Simplified if(y)
    $('THEN');
}
*/
`````


## Settled


`````js filename=intro
$(true);
$(false);
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(false);
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( false );
$( "THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let outer_x = $(true);
let y = !outer_x;
if (outer_x) {
  y = true;
} else {
}
let x = $(false);
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
