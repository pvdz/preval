# Preval test case

# ai_rule305_if_true_opaque_then.md

> Ai > Ai4 > Ai rule305 if true opaque then
>
> Test: if(true) with opaque call in then block.

## Input

`````js filename=intro
// Expected: $('foo');
if (true) { $('foo'); }
`````


## Settled


`````js filename=intro
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`foo`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
