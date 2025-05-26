# Preval test case

# if_fold_ternary_const_edge_31.md

> If test merging > If fold ternary const edge 31
>
> Edge Case 31: NO CHANGE - y = undefined in then, y = 'abc' in else

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x) {
  // x is true, y was false
  y = undefined; // y remains falsy (not made truthy)
} else {
  // x is false, y was true
  y = 'abc'; // y reassigned, but to truthy (not made falsy)
}

// y is undefined if x, 'abc' if !x. Not consistently T/F.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change):
let x = $(true);
let y = !x;
if (x) {
  y = undefined;
} else {
  y = 'abc';
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
if (x) {
  y = undefined;
} else {
  y = `abc`;
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
