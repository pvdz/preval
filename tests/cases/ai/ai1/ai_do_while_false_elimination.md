# Preval test case

# ai_do_while_false_elimination.md

> Ai > Ai1 > Ai do while false elimination
>
> Test: do { $('body'); } while (false) loop elimination.

## Input

`````js filename=intro
// Expected: $('body');
do {
  $('body');
} while (false);
`````


## Settled


`````js filename=intro
$(`body`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`body`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "body" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`body`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'body'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
