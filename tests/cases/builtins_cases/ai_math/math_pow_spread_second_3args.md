# Preval test case

# math_pow_spread_second_3args.md

> Builtins cases > Ai math > Math pow spread second 3args
>
> Test Math.pow with spread operator on second argument and 3 total arguments

## Input

`````js filename=intro
const base = 2;
const exponents = [3, 4];
const result = Math.pow(base, ...exponents);
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
const base = 2;
const exponents = [3, 4];
const tmpMCF = $Math_pow;
const result = $Math_pow(base, ...exponents);
let tmpCalleeParam = result === 8;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_pow


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
