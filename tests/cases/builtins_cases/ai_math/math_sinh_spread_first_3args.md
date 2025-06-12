# Preval test case

# math_sinh_spread_first_3args.md

> Builtins cases > Ai math > Math sinh spread first 3args
>
> Test Math.sinh with spread operator on first argument and 3 total arguments

## Input

`````js filename=intro
const args = [1, 2, 3];
$(Math.sinh(...args));
// Expected: 1.1752011936438014
`````


## Settled


`````js filename=intro
$(1.1752011936438014);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.1752011936438014);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.1752011936438014 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const args = [1, 2, 3];
const tmpMCF = $Math_sinh;
let tmpCalleeParam = $Math_sinh(...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.1752011936438014
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
