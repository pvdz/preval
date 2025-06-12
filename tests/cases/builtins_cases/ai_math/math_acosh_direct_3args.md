# Preval test case

# math_acosh_direct_3args.md

> Builtins cases > Ai math > Math acosh direct 3args
>
> Test Math.acosh called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.acosh(5, 1, 0));
// Expected: 2.2924316695611777
`````


## Settled


`````js filename=intro
$(2.2924316695611777);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.2924316695611777);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.2924316695611777 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acosh;
const tmpArgOverflow = 5;
let tmpCalleeParam = $Math_acosh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.2924316695611777
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
