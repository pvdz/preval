# Preval test case

# math_cosh_direct_1arg.md

> Builtins cases > Ai math > Math cosh direct 1arg
>
> Test Math.cosh called directly with one argument (1)

## Input

`````js filename=intro
$(Math.cosh(1));
// Expected: 1.5430806348152437
`````


## Settled


`````js filename=intro
$(1.5430806348152437);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.5430806348152437);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.5430806348152437 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cosh;
let tmpCalleeParam = 1.5430806348152437;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.5430806348152437
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
