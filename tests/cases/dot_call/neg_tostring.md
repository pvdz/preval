# Preval test case

# neg_tostring.md

> Dot call > Neg tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const num = -500;
const tmpCallVal = num.toString;
const x = $dotCall(tmpCallVal, num, 'toString');
$(x);
`````


## Settled


`````js filename=intro
$(`-500`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`-500`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "-500" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '-500'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
