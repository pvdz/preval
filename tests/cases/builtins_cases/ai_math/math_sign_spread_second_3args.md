# Preval test case

# math_sign_spread_second_3args.md

> Builtins cases > Ai math > Math sign spread second 3args
>
> Test Math.sign with spread operator on second argument and 3 total arguments

## Input

`````js filename=intro
const num = -5;
const args = [2, 3];
$(Math.sign(num, ...args));
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
const num = -5;
const args = [2, 3];
const tmpMCF = $Math_sign;
const tmpArgOverflow = num;
[...args];
let tmpCalleeParam = $Math_sign(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
