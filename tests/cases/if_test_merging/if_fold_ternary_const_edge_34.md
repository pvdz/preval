# Preval test case

# if_fold_ternary_const_edge_34.md

> If test merging > If fold ternary const edge 34
>
> Edge Case 34: NO CHANGE by C/D/A - y = !x in controlIf.then (effectively no change to y's state relative to x)

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x) {
  // x is true, y was false.
  y = !x; // y is assigned !true, so false. yMadeTruthyInThen = false.
} else {
  // x is false, y was true. Not reassigned.
}

// y remains !x. No change for C, D, A by this rule.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change to targetIf by this rule's main scenarios):
let x = $(true);
let y = !x;
if (x) {
  y = !x;
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
if (x) {
  y = !x;
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
 - 2: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
