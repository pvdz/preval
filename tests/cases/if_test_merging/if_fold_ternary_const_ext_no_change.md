# Preval test case

# if_fold_ternary_const_ext_no_change.md

> If test merging > If fold ternary const ext no change
>
> Test No Change: y does not become consistently truthy or falsy

## Input

`````js filename=intro
let x = $(true);
let y = !x;
let z = $('something'); // an unknown identifier

if (x) {
  // x is true, y was false.
  y = z; // y assigned an unknown, could be truthy or falsy
} else {
  // x is false, y was true.
  // y not reassigned, remains true.
}

// y's state is conditional on z (if x path taken) or true (if else path taken).
// Not consistently truthy or falsy overall without knowing z.
// The rule should not simplify if(y).
if (y) {
  $('BRANCH_THEN');
} else {
  $('BRANCH_ELSE');
}

/* Expected output (no change to the second if):
let x = $(true);
let y = !x;
let z = $('something');

if (x) {
  y = z;
} else {
  // y not reassigned
}

if (y) {
  $('BRANCH_THEN');
} else {
  $('BRANCH_ELSE');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
let y /*:unknown*/ /*ternaryConst*/ = !x;
const z /*:unknown*/ = $(`something`);
if (x) {
  y = z;
} else {
}
if (y) {
  $(`BRANCH_THEN`);
} else {
  $(`BRANCH_ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
let y = !x;
const z = $(`something`);
if (x) {
  y = z;
}
if (y) {
  $(`BRANCH_THEN`);
} else {
  $(`BRANCH_ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
let b = !a;
const c = $( "something" );
if (a) {
  b = c;
}
if (b) {
  $( "BRANCH_THEN" );
}
else {
  $( "BRANCH_ELSE" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
let z = $(`something`);
if (x) {
  y = z;
} else {
}
if (y) {
  $(`BRANCH_THEN`);
} else {
  $(`BRANCH_ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'something'
 - 3: 'BRANCH_THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
