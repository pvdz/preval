# Preval test case

# base.md

> Console > Base
>
>

## Input

`````js filename=intro
console.log('console test case');
`````


## Settled


`````js filename=intro
console.log(`console test case`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
console.log(`console test case`);
`````


## PST Settled
With rename=true

`````js filename=intro
console.log( "console test case" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
