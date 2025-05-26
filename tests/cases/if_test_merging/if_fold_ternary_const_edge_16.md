# Preval test case

# if_fold_ternary_const_edge_16.md

> If test merging > If fold ternary const edge 16
>
> Edge Case 16: NO CHANGE - y reassigned to unknown `z` in then, Scenario C condition yMadeTruthyInThen fails

## Input

`````js filename=intro
let x = $(true);
let y = !x;
let z = $('mystery');

if (x) {
  // x is true, y was false
  y = z; // y is not known to be truthy
} else {
  // x is false, y was true. Not reassigned, remains true.
}

// y is not consistently truthy (depends on z)
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change):
let x = $(true);
let y = !x;
let z = $('mystery');
if (x) {
  y = z;
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
let y /*:unknown*/ /*ternaryConst*/ = !x;
const z /*:unknown*/ = $(`mystery`);
if (x) {
  y = z;
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
let y = !x;
const z = $(`mystery`);
if (x) {
  y = z;
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
let b = !a;
const c = $( "mystery" );
if (a) {
  b = c;
}
if (b) {
  $( "THEN" );
}
else {
  $( "ELSE" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
let z = $(`mystery`);
if (x) {
  y = z;
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
 - 2: 'mystery'
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
