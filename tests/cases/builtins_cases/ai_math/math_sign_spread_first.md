# Preval test case

# math_sign_spread_first.md

> Builtins cases > Ai math > Math sign spread first
>
> Test Math.sign with spread operator on first argument

## Input

`````js filename=intro
const args = [-5];
$(Math.sign(...args));
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const args = [-5];
const tmpMCF = $Math_sign;
let tmpCalleeParam = $Math_sign(...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sign


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
