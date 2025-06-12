# Preval test case

# math_sin_spread_second.md

> Builtins cases > Ai math > Math sin spread second
>
> Test Math.sin with spread operator on second argument

## Input

`````js filename=intro
const num = 0;
const args = [2];
$(Math.sin(num, ...args));
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = 0;
const args = [2];
const tmpMCF = $Math_sin;
const tmpArgOverflow = num;
[...args];
let tmpCalleeParam = $Math_sin(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
