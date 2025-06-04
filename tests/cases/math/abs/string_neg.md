# Preval test case

# string_neg.md

> Math > Abs > String neg
>
> Various cases of Math.abbs

## Input

`````js filename=intro
$(Math.abs(-"hello"));
`````


## Settled


`````js filename=intro
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
const tmpMCP = NaN;
let tmpCalleeParam = $dotCall(tmpMCF, Math, `abs`, $Number_NaN);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
