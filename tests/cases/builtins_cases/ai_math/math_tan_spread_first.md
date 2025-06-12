# Preval test case

# math_tan_spread_first.md

> Builtins cases > Ai math > Math tan spread first
>
> Test Math.tan with spread operator on first argument

## Input

`````js filename=intro
const args = [0];
$(Math.tan(...args));
// Expected: 0
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
const args = [0];
const tmpMCF = $Math_tan;
let tmpCalleeParam = $Math_tan(...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_tan


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
