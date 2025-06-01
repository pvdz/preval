# Preval test case

# ai_logical_and_assign_use_effects.md

> Ai > Ai1 > Ai logical and assign use effects
>
> Test: Logical AND && with opaque LHS, RHS effect, result assigned and used.

## Input

`````js filename=intro
// Expected: (Correct value propagation for r based on LHS/RHS values and effects)
let r = $('LHS') && $('RHS');
$('use', r);
`````


## Settled


`````js filename=intro
const r /*:unknown*/ = $(`LHS`);
if (r) {
  const tmpClusterSSA_r /*:unknown*/ = $(`RHS`);
  $(`use`, tmpClusterSSA_r);
} else {
  $(`use`, r);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const r = $(`LHS`);
if (r) {
  $(`use`, $(`RHS`));
} else {
  $(`use`, r);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "LHS" );
if (a) {
  const b = $( "RHS" );
  $( "use", b );
}
else {
  $( "use", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let r = $(`LHS`);
if (r) {
  r = $(`RHS`);
  $(`use`, r);
} else {
  $(`use`, r);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'LHS'
 - 2: 'RHS'
 - 3: 'use', 'RHS'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
