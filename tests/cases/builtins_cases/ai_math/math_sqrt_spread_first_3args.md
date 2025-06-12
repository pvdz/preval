# Preval test case

# math_sqrt_spread_first_3args.md

> Builtins cases > Ai math > Math sqrt spread first 3args
>
> Test Math.sqrt with spread operator on first argument and 3 total arguments

## Input

`````js filename=intro
const args = [4, 2, 3];
$(Math.sqrt(...args));
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
const args = [4, 2, 3];
const tmpMCF = $Math_sqrt;
let tmpCalleeParam = $Math_sqrt(...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sqrt


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
