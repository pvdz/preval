# Preval test case

# math_cosh_direct_2args.md

> Builtins cases > Ai math > Math cosh direct 2args
>
> Test Math.cosh called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.cosh(-1, 2));
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
const tmpArgOverflow = -1;
let tmpCalleeParam = $Math_cosh(tmpArgOverflow);
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
