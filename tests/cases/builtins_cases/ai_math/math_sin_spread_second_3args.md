# Preval test case

# math_sin_spread_second_3args.md

> Builtins cases > Ai math > Math sin spread second 3args
>
> Test Math.sin with spread operator on second argument and 3 total arguments

## Input

`````js filename=intro
const num = 0;
const args = [2, 3];
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
const args = [2, 3];
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
