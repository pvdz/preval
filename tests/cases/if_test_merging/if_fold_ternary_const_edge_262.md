# Preval test case

# if_fold_ternary_const_edge_262.md

> If test merging > If fold ternary const edge 262
>
> Edge Case 26: NO CHANGE by Scenarios C,D,A - y = y in controlIf.then and controlIf.else

## Input

`````js filename=intro
let x = $(true);
let y = $({ a: 1, b: 2 });

if (x) {
  y = y.a; // y remains false (not made truthy)
} else {
  y = y.a; // y remains true (not made falsy)
}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
`````


## Settled


`````js filename=intro
$(true);
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const y /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_y /*:unknown*/ = y.a;
if (tmpClusterSSA_y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
if ($({ a: 1, b: 2 }).a) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
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
let tmpCalleeParam = { a: 1, b: 2 };
let y = $(tmpCalleeParam);
if (x) {
  y = y.a;
} else {
  y = y.a;
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
 - 2: { a: '1', b: '2' }
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
