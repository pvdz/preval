# Preval test case

# ai_while_false_elimination.md

> Ai > Ai1 > Ai while false elimination
>
> Test: while(false) loop elimination.

## Input

`````js filename=intro
// Expected: $("A"); $("C");
$("A");
while (false) {
  $("B_NEVER_CALLED");
}
$("C");
`````


## Settled


`````js filename=intro
$(`A`);
$(`C`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
$(`C`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
$( "C" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`A`);
$(`C`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'C'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
