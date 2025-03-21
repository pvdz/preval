# Preval test case

# shorthand.md

> Normalize > Object > Shorthand
>
> Shorthand should normalize to a regular property

## Input

`````js filename=intro
const x = 10;
const obj = {x};
$(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { x: 10 };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 10 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 10 };
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
