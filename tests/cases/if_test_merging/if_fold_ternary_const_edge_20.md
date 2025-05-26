# Preval test case

# if_fold_ternary_const_edge_20.md

> If test merging > If fold ternary const edge 20
>
> Edge Case 20: Scenario D - y assigned multiple times in controlIf.else, ends falsy

## Input

`````js filename=intro
let x = $(true);
let y = !x; // if x=T, y=F; if x=F, y=T

if (x) {
  // x is true, y was false. Not reassigned, remains false.
} else {
  // x is false, y was true.
  y = {};    // made truthy
  y = null;  // then made falsy
}

// y is always falsy (false from then, or null from else)
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
if (x) {
} else {
  y = {};
  y = null;
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
} else {
  y = {};
  y = null;
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
