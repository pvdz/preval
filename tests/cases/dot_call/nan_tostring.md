# Preval test case

# nan_tostring.md

> Dot call > Nan tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const naN = NaN;
const tmpCallVal = naN.toString;
const x = $dotCall(tmpCallVal, naN, 'toString');
$(x);
`````


## Settled


`````js filename=intro
$(`NaN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`NaN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "NaN" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
