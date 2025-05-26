# Preval test case

# if_fold_ternary_const_edge_10.md

> If test merging > If fold ternary const edge 10
>
> Edge Case 10: y assigned null in then (falsy), y made false in else. SHOULD BE SCENARIO D.

## Input

`````js filename=intro
let x = $(true);
let y = !x; // if x=T, y=F; if x=F, y=T

if (x) {
  // x is true, y was false
  y = null; // y remains falsy (not made truthy)
} else {
  // x is false, y was true
  y = false; // y made falsy
}

// y is always falsy
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
if (x) {
  y = null;
} else {
  y = false;
}
{ // Simplified from if(y)
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
$(true);
$(`ELSE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`ELSE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "ELSE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = null;
} else {
  y = false;
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
