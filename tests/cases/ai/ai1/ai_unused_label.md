# Preval test case

# ai_unused_label.md

> Ai > Ai1 > Ai unused label
>
> Test: Unused labeled statement removal.

## Input

`````js filename=intro
// Expected: { $('A'); } $('B');
mylabel: {
  $('A');
}
$('B');
`````


## Settled


`````js filename=intro
$(`A`);
$(`B`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
$(`B`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
$( "B" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`A`);
$(`B`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'B'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
