# Preval test case

# ai_logical_or_unused_result_effects.md

> Ai > Ai1 > Ai logical or unused result effects
>
> Test: Short-circuit OR || with side effect in RHS, result unused.

## Input

`````js filename=intro
// Expected: const $$s1 = $('S1'); if (!$$s1) { $('S2'); } $('after');
let r = $('S1') || $('S2'); // r is unused
$('after');
`````


## Settled


`````js filename=intro
const r /*:unknown*/ = $(`S1`);
if (r) {
  $(`after`);
} else {
  $(`S2`);
  $(`after`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`S1`)) {
  $(`after`);
} else {
  $(`S2`);
  $(`after`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "S1" );
if (a) {
  $( "after" );
}
else {
  $( "S2" );
  $( "after" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let r = $(`S1`);
if (r) {
  $(`after`);
} else {
  r = $(`S2`);
  $(`after`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'S1'
 - 2: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
