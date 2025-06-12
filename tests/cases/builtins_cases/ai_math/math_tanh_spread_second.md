# Preval test case

# math_tanh_spread_second.md

> Builtins cases > Ai math > Math tanh spread second
>
> Test Math.tanh with spread operator on second argument

## Input

`````js filename=intro
const num = 1;
const args = [2];
$(Math.tanh(num, ...args));
// Expected: 0.7615941559557649
`````


## Settled


`````js filename=intro
$(0.7615941559557649);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.7615941559557649);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.7615941559557649 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = 1;
const args = [2];
const tmpMCF = $Math_tanh;
const tmpArgOverflow = num;
[...args];
let tmpCalleeParam = $Math_tanh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7615941559557649
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
