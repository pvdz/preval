# Preval test case

# math_round_spread_second_3args.md

> Builtins cases > Ai math > Math round spread second 3args
>
> Test Math.round with spread operator on second argument and 3 total arguments

## Input

`````js filename=intro
const num = 3.7;
const args = [2, 3];
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
const args = [2, 3];
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
