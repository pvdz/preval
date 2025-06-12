# Preval test case

# math_sqrt_spread_second.md

> Builtins cases > Ai math > Math sqrt spread second
>
> Test Math.sqrt with spread operator on second argument

## Input

`````js filename=intro
const num = 4;
const args = [2];
$(Math.sqrt(num, ...args));
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = 4;
const args = [2];
const tmpMCF = $Math_sqrt;
const tmpArgOverflow = num;
[...args];
let tmpCalleeParam = $Math_sqrt(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
