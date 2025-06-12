# Preval test case

# math_pow_direct_2args.md

> Builtins cases > Ai math > Math pow direct 2args
>
> Test Math.pow with 2 direct arguments

## Input

`````js filename=intro
const result = Math.pow(2, 3);
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
const result = 8;
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
