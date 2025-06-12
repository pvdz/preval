# Preval test case

# math_acosh_direct_2args.md

> Builtins cases > Ai math > Math acosh direct 2args
>
> Test Math.acosh called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.acosh(2, 3));
// Expected: 1.3169578969248166
`````


## Settled


`````js filename=intro
$(1.3169578969248166);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.3169578969248166);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.3169578969248166 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acosh;
const tmpArgOverflow = 2;
let tmpCalleeParam = $Math_acosh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.3169578969248166
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
