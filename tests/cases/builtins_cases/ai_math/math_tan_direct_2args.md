# Preval test case

# math_tan_direct_2args.md

> Builtins cases > Ai math > Math tan direct 2args
>
> Test Math.tan with 2 arguments

## Input

`````js filename=intro
$(Math.tan(0, 2));
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
const tmpMCF = $Math_tan;
const tmpArgOverflow = 0;
let tmpCalleeParam = $Math_tan(tmpArgOverflow);
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
