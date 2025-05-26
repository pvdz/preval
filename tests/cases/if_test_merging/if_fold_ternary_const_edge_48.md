# Preval test case

# if_fold_ternary_const_edge_48.md

> If test merging > If fold ternary const edge 48
>
> Edge Case 48: NO CHANGE - y (targetIfTestName) is shadowed inside controlIfNode

## Input

`````js filename=intro
let x = $(true);
let y = !x; // Outer y. x=T,y_outer=F; x=F,y_outer=T

if (x) {
  // x is true, outer y was false.
  let y = "shadow"; // Inner y. This assignment does not affect outer y.
                   // yReassignedInThen for outer y should be false.
} else {
  // x is false, outer y was true. Outer y not reassigned.
}

// Outer y is not affected by assignments to inner y.
// It remains !x. No change for C, D, A for outer y.
if (y) { // Tests outer y
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE to outer if(y)):
let x = $(true);
let y = !x;
if (x) {
  let y = "shadow";
} else {}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "ELSE" );
}
else {
  $( "THEN" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  let y$1 = `shadow`;
} else {
}
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
 - 2: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
