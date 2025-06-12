# Preval test case

# math_round_spread_second.md

> Builtins cases > Ai math > Math round spread second
>
> Test Math.round with spread operator on second argument

## Input

`````js filename=intro
const num = 3.7;
const args = [];
const result = Math.round(num, ...args);
$(result === 4);
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
const num = 3.7;
const args = [];
const tmpMCF = $Math_round;
const tmpArgOverflow = num;
[...args];
const result = $Math_round(tmpArgOverflow);
let tmpCalleeParam = result === 4;
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
