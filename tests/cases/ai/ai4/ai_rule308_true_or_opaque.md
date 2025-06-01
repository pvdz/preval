# Preval test case

# ai_rule308_true_or_opaque.md

> Ai > Ai4 > Ai rule308 true or opaque
>
> Test: true || opaque_call, result used.

## Input

`````js filename=intro
// Expected: $('after', true);
let y = true || $('side-effect'); 
$('after', y);
`````


## Settled


`````js filename=intro
$(`after`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "after", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = true;
if (y) {
  $(`after`, y);
} else {
  y = $(`side-effect`);
  $(`after`, y);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'after', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
