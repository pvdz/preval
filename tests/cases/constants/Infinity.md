# Preval test case

# Infinity.md

> Constants > Infinity
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = Infinity;
const bar = foo;
$(bar)
`````


## Settled


`````js filename=intro
$(Infinity);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Infinity);
`````


## PST Settled
With rename=true

`````js filename=intro
$( Infinity );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
