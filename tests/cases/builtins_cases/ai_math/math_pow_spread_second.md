# Preval test case

# math_pow_spread_second.md

> Builtins cases > Ai math > Math pow spread second
>
> Test Math.pow with spread operator on second argument

## Input

`````js filename=intro
const base = 2;
const exponents = [3];
const result = Math.pow(base, ...exponents);
result === 8;
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const base = 2;
const exponents = [3];
const tmpMCF = $Math_pow;
const result = $Math_pow(base, ...exponents);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_pow


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
