# Preval test case

# if_fold_ternary_const_edge_26.md

> If test merging > If fold ternary const edge 26
>
> Edge Case 26: NO CHANGE by Scenarios C,D,A - y = y in controlIf.then and controlIf.else

## Input

`````js filename=intro
let x = $(true);
let y = !x; // if x=T, y=F; if x=F, y=T

if (x) {
  // x is true, y was false
  y = y; // y remains false (not made truthy)
} else {
  // x is false, y was true
  y = y; // y remains true (not made falsy)
}

// y effectively remains !x. No change for C, D, A.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change to targetIf by this rule's main scenarios):
let x = $(true);
let y = !x;
if (x) {
  y = y;
} else {
  y = y;
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
