# Preval test case

# ai_rule307_false_and_opaque.md

> Ai > Ai4 > Ai rule307 false and opaque
>
> Test: false && opaque_call, result used.

## Input

`````js filename=intro
// Expected: $('after', false);
let x = false && $('side-effect'); 
$('after', x);
`````


## Settled


`````js filename=intro
$(`after`, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`, false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "after", false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = false;
if (x) {
  x = $(`side-effect`);
  $(`after`, x);
} else {
  $(`after`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'after', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
