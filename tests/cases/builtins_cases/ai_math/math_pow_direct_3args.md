# Preval test case

# math_pow_direct_3args.md

> Builtins cases > Ai math > Math pow direct 3args
>
> Test Math.pow with 3 arguments

## Input

`````js filename=intro
const result = Math.pow(2, 3, 4);
$(result === 8);
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
const tmpArgOverflow = 2;
const tmpArgOverflow$1 = 3;
const result = $Math_pow(tmpArgOverflow, tmpArgOverflow$1);
let tmpCalleeParam = result === 8;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
