# Preval test case

# false_neg.md

> Math > Abs > False neg
>
> Various cases of Math.abbs

## Input

`````js filename=intro
$(Math.abs(-false));
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
const tmpMCP = -0;
let tmpCalleeParam = $dotCall(tmpMCF, Math, `abs`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
