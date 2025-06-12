# Preval test case

# math_tanh_spread_first.md

> Builtins cases > Ai math > Math tanh spread first
>
> Test Math.tanh with spread operator on first argument

## Input

`````js filename=intro
const args = [1];
$(Math.tanh(...args));
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
const args = [1];
const tmpMCF = $Math_tanh;
let tmpCalleeParam = $Math_tanh(...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_tanh


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
