# Preval test case

# math_expm1_direct_1arg.md

> Builtins cases > Ai math > Math expm1 direct 1arg
>
> Test Math.expm1 called directly with one argument (1)

## Input

`````js filename=intro
$(Math.expm1(1));
// Expected: 1.718281828459045
`````


## Settled


`````js filename=intro
$(1.718281828459045);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.718281828459045);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.718281828459045 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_expm1;
let tmpCalleeParam = 1.718281828459045;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.718281828459045
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
