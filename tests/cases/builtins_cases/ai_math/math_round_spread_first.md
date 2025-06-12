# Preval test case

# math_round_spread_first.md

> Builtins cases > Ai math > Math round spread first
>
> Test Math.round with spread operator on first argument

## Input

`````js filename=intro
const args = [3.7];
const result = Math.round(...args);
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
const args = [3.7];
const tmpMCF = $Math_round;
const result = $Math_round(...args);
let tmpCalleeParam = result === 4;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_round


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
