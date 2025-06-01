# Preval test case

# ai_try_empty_catch_effect.md

> Ai > Ai1 > Ai try empty catch effect
>
> Test: Empty try block, catch block with side effects.

## Input

`````js filename=intro
// Expected: $('after'); (try-catch and catch_effect removed)
try {
  // empty
} catch (e) {
  $('catch_effect');
}
$('after');
`````


## Settled


`````js filename=intro
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`after`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
