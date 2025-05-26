# Preval test case

# if_fold_ternary_const_edge_45.md

> If test merging > If fold ternary const edge 45
>
> Edge Case 45: NO CHANGE - y assigned (0, "truthy") in then (SequenceExpression)

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x) {
  // x is true, y was false
  y = (0, "truthy"); // RHS is SequenceExpression. yMadeTruthyInThen=false.
} else {
  // x is false, y was true. Not reassigned.
}

// No change by this rule.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
if (x) {
  y = (0, "truthy");
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
  y = `truthy`;
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
 - 2: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
