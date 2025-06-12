# Preval test case

# math_sinh_spread_second_3args.md

> Builtins cases > Ai math > Math sinh spread second 3args
>
> Test Math.sinh with spread operator on second argument and 3 total arguments

## Input

`````js filename=intro
const num = 1;
const args = [2, 3];
$(Math.sinh(num, ...args));
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
const num = 1;
const args = [2, 3];
const tmpMCF = $Math_sinh;
const tmpArgOverflow = num;
[...args];
let tmpCalleeParam = $Math_sinh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
