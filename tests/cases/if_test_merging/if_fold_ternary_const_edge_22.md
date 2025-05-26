# Preval test case

# if_fold_ternary_const_edge_22.md

> If test merging > If fold ternary const edge 22
>
> Edge Case 22: Scenario D - controlIf.then y reassigned to falsy 0

## Input

`````js filename=intro
let x = $(true);
let y = !x; // if x=T, y=F; if x=F, y=T

if (x) {
  // x is true, y was false
  y = 0; // y reassigned, but remains falsy (not made truthy)
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
  y = 0;
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
  y = 0;
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
