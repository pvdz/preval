# Preval test case

# if_fold_ternary_const_edge_30.md

> If test merging > If fold ternary const edge 30
>
> Edge Case 30: Scenario D - y assigned NaN in else

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x) {
  // x is true, y was false. Not reassigned.
} else {
  // x is false, y was true.
  y = NaN; // y becomes falsy
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
} else {
  y = NaN;
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
  y = $Number_NaN;
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
