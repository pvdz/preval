# Preval test case

# if_fold_ternary_const_edge_14.md

> If test merging > If fold ternary const edge 14
>
> Edge Case 14: NO CHANGE - controlIfNode.test (z) does not match y's init var (x)

## Input

`````js filename=intro
let x = $(true);
let z = $(false);
let y = !x;

if (z) { // Control if is on `z`, not `x`
  y = true;
} else {
  y = false;
}

// Rule shouldn't apply
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change):
let x = $(true);
let z = $(false);
let y = !x;
if (z) {
  y = true;
} else {
  y = false;
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
const z /*:unknown*/ = $(false);
if (z) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
if ($(false)) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
const a = $( false );
if (a) {
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
let z = $(false);
let y = !x;
if (z) {
  y = true;
} else {
  y = false;
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
