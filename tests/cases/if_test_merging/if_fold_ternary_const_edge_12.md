# Preval test case

# if_fold_ternary_const_edge_12.md

> If test merging > If fold ternary const edge 12
>
> Edge Case 12: NO CHANGE - y initialized with complex expression, not just !Identifier

## Input

`````js filename=intro
let x = $(true);
let z = $(false);
let y = !x && z;

if (x) {
  y = true;
} else {
  // y not reassigned
}

// Rule shouldn't apply because y's init is too complex
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change to second if):
let x = $(true);
let z = $(false);
let y = !x && z;
if (x) {
  y = true;
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
const z /*:unknown*/ = $(false);
let y /*:unknown*/ /*ternaryConst*/ = true;
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
const z = $(false);
let y = true;
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
const b = $( false );
let c = true;
if (a) {

}
else {
  c = b;
}
if (c) {
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
if (y) {
  y = z;
} else {
}
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
 - 2: false
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
