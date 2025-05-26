# Preval test case

# if_fold_ternary_const_edge_25.md

> If test merging > If fold ternary const edge 25
>
> Edge Case 25: NO CHANGE - x or y is modified between controlIf and targetIf

## Input

`````js filename=intro
let x = $(true);
let y = !x;

if (x) { // controlIfNode
  y = true;
} else {
  // y not reassigned, y is true (if x was false)
}

x = $(false); // x is modified! Invalidates assumption about y's state based on original x.

// If rule ran, it would think y is true. But x changed, so y's actual value is complex.
// Current rule doesn't check for interference.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change by this rule due to complexity of interference check):
let x = $(true);
let y = !x;
if (x) {
  y = true;
} else {}
x = $(false);
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
$(false);
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(false);
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( false );
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
x = $(false);
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
 - 2: false
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
