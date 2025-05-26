# Preval test case

# if_fold_ternary_const_edge_17.md

> If test merging > If fold ternary const edge 17
>
> Edge Case 17: NO CHANGE - y reassigned to unknown `z` in else, Scenario D condition yMadeFalsyInElse fails

## Input

`````js filename=intro
let x = $(true);
let y = !x;
let z = $('mystery');

if (x) {
  // x is true, y was false. Not reassigned, remains false.
} else {
  // x is false, y was true.
  y = z; // y is not known to be falsy
}

// y is not consistently falsy (depends on z)
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
} else {
  y = z;
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
let y /*:unknown*/ /*ternaryConst*/ = !x;
const z /*:unknown*/ = $(`mystery`);
if (x) {
} else {
  y = z;
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
if (!x) {
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

}
else {
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
} else {
  y = z;
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
 - 3: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
