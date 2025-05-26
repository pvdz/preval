# Preval test case

# if_fold_ternary_const_edge_49.md

> If test merging > If fold ternary const edge 49
>
> Edge Case 49: Scenario C - controlVar x is shadowed inside controlIfNode branches

## Input

`````js filename=intro
let x = $(true); // Outer x
let y = !x;    // y is !outer_x. x=T,y=F; x=F,y=T

if (x) { // Tests outer x
  // outer x is true, y was false.
  let x = "shadow_x_then"; // Inner x, irrelevant to outer x condition
  y = {id: x}; // y made truthy. (Value of inner x doesn't make {} not truthy)
} else {
  // outer x is false, y was true.
  let x = "shadow_x_else"; // Inner x
  // y not reassigned.
}

// y is consistently truthy.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
if (x) {
  let x = "shadow_x_then";
  y = {id: x};
} else {
  let x = "shadow_x_else";
}
{ // Simplified from if(y)
  $('THEN');
}
*/
`````


## Settled


`````js filename=intro
$(true);
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  let x$1 = `shadow_x_then`;
  y = { id: x$1 };
} else {
  let x$3 = `shadow_x_else`;
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
 - 2: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
