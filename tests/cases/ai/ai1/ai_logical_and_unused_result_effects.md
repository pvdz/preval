# Preval test case

# ai_logical_and_unused_result_effects.md

> Ai > Ai1 > Ai logical and unused result effects
>
> Test: Short-circuit AND && with side effect in RHS, result unused.

## Input

`````js filename=intro
// Expected: const $$s1 = $('S1'); if ($$s1) { $('S2'); } $('after');
let r = $('S1') && $('S2'); // r is unused
$('after');
`````


## Settled


`````js filename=intro
const r /*:unknown*/ = $(`S1`);
if (r) {
  $(`S2`);
  $(`after`);
} else {
  $(`after`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`S1`)) {
  $(`S2`);
  $(`after`);
} else {
  $(`after`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "S1" );
if (a) {
  $( "S2" );
  $( "after" );
}
else {
  $( "after" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let r = $(`S1`);
if (r) {
  r = $(`S2`);
  $(`after`);
} else {
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
 - 2: 'S2'
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
