# Preval test case

# if_fold_ternary_const_edge_37.md

> If test merging > If fold ternary const edge 37
>
> Edge Case 37: NO CHANGE - targetIfNode is before controlIfNode

## Input

`````js filename=intro
let x = $(true);
let y = !x;

// Target If is first
if (y) {
  $('THEN_TARGET');
} else {
  $('ELSE_TARGET');
}

// Control If is second
if (x) {
  y = true;
} else {
  y = false;
}

/* Expected output (NO CHANGE):
let x = $(true);
let y = !x;
if (y) {
  $('THEN_TARGET');
} else {
  $('ELSE_TARGET');
}
if (x) {
  y = true;
} else {
  y = false;
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`ELSE_TARGET`);
} else {
  $(`THEN_TARGET`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`ELSE_TARGET`);
} else {
  $(`THEN_TARGET`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "ELSE_TARGET" );
}
else {
  $( "THEN_TARGET" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (y) {
  $(`THEN_TARGET`);
} else {
  $(`ELSE_TARGET`);
}
if (x) {
  y = true;
} else {
  y = false;
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'ELSE_TARGET'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
