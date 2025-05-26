# Preval test case

# if_fold_ternary_const_edge_9.md

> If test merging > If fold ternary const edge 9
>
> Edge Case 9: y made truthy in then, reassigned to truthy ({}) in else. SHOULD BE SCENARIO C.

## Input

`````js filename=intro
let x = $(true);
let y = !x; // if x=T, y=F; if x=F, y=T

if (x) {
  // x is true, y was false
  y = 123; // y made truthy
} else {
  // x is false, y was true
  y = { foo: 'bar' }; // y reassigned, but still truthy. This fits (!yReassignedInElse || (yReassignedInElse && !yMadeFalsyInElse))
}

// y is always truthy
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
if (x) {
  y = 123;
} else {
  y = { foo: 'bar' };
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
  y = 123;
} else {
  y = { foo: `bar` };
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
