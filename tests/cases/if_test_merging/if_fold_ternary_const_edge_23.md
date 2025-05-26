# Preval test case

# if_fold_ternary_const_edge_23.md

> If test merging > If fold ternary const edge 23
>
> Edge Case 23: NO CHANGE - controlIfNode has no else block (alternate is null)

## Input

`````js filename=intro
let x = $(true);
let y = !x;

if (x) { // controlIfNode
  y = true;
}
// No else block for controlIfNode

// Logic for Scenario C/D/A requires analyzing controlIfNode.alternate.
// If alternate is null, rule should not match or should handle gracefully.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change):
let x = $(true);
let y = !x;
if (x) {
  y = true;
}
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
  y = true;
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
