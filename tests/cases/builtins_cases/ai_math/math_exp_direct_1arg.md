# Preval test case

# math_exp_direct_1arg.md

> Builtins cases > Ai math > Math exp direct 1arg
>
> Test Math.exp called directly with one argument (1)

## Input

`````js filename=intro
$(Math.exp(1));
// Expected: 2.718281828459045
`````


## Settled


`````js filename=intro
$(2.718281828459045);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.718281828459045);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.718281828459045 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_exp;
let tmpCalleeParam = 2.718281828459045;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.718281828459045
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
