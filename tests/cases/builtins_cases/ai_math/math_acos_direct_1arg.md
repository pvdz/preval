# Preval test case

# math_acos_direct_1arg.md

> Builtins cases > Ai math > Math acos direct 1arg
>
> Test Math.acos called directly with one argument (0.5)

## Input

`````js filename=intro
$(Math.acos(0.5));
// Expected: 1.0471975511965979
`````


## Settled


`````js filename=intro
$(1.0471975511965979);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.0471975511965979);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.0471975511965979 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acos;
let tmpCalleeParam = 1.0471975511965979;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.0471975511965979
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
