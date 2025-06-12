# Preval test case

# math_clz32_direct_2args.md

> Builtins cases > Ai math > Math clz32 direct 2args
>
> Test Math.clz32 called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.clz32(0xF0F0, 2));
// Expected: 16
`````


## Settled


`````js filename=intro
$(16);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(16);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 16 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
const tmpArgOverflow = 61680;
let tmpCalleeParam = $Math_clz32(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 16
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
