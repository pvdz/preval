# Preval test case

# ai_rule322_nullish_coalesce_opaque_effect.md

> Ai > Ai3 > Ai rule322 nullish coalesce opaque effect
>
> Test: Nullish coalescing with opaque LHS and side-effecting opaque RHS.

## Input

`````js filename=intro
// Expected: let x = $('lhs') ?? $('rhs_effect'); $('result', x);
let x = $('lhs') ?? $('rhs_effect');
$('result', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`lhs`);
const tmpIfTest /*:boolean*/ = x == null;
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`rhs_effect`);
  $(`result`, tmpClusterSSA_x);
} else {
  $(`result`, x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`lhs`);
if (x == null) {
  $(`result`, $(`rhs_effect`));
} else {
  $(`result`, x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "lhs" );
const b = a == null;
if (b) {
  const c = $( "rhs_effect" );
  $( "result", c );
}
else {
  $( "result", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`lhs`);
const tmpIfTest = x == null;
if (tmpIfTest) {
  x = $(`rhs_effect`);
  $(`result`, x);
} else {
  $(`result`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'lhs'
 - 2: 'result', 'lhs'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
