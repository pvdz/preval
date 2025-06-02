# Preval test case

# if_fold_ternary_const_edge_18.md

> If test merging > If fold ternary const edge 18
>
> Edge Case 18: NO CHANGE - y declared in a different scope (e.g. nested block)

## Input

`````js filename=intro
let x = $(true);

{
  let y = !x;
  if (x) { // This is the controlIfNode, but y is in a different scope than targetIfNode
    y = true;
  }
}

// if (y) { ... } // This y would be undefined if it's not hoisted or outside, or this is the targetIfNode for a *different* y
// Forcing a testable case where targetIf might see a global y, but controlIf saw local.
// This specific pattern is hard to make for this rule, let's simplify:
// Let's assume y is shadowed or simply not the same `y` due to scoping.
// The rule relies on finding varDecl, controlIf, targetIf in same parent array and correct PID order.

let y_outer = !x; // This is the y the targetIf sees
if (x) { // controlIf
    let y_inner = !x; // y_inner is NOT y_outer
    y_inner = true; 
} else {
    // y_outer is not changed
}

if (y_outer) { // targetIf
    $('THEN');
} else {
    $('ELSE');
}

/* Expected output (no change to targetIf):
let x = $(true);
let y_outer = !x;
if (x) {
    let y_inner = !x;
    y_inner = true;
} else {}
if (y_outer) {
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
  y = true;
} else {
}
let y_outer = !x;
if (x) {
  let y_inner = false;
  y_inner = true;
} else {
}
if (y_outer) {
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
