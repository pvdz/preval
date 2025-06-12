# Preval test case

# math_log1p_direct_1arg.md

> Builtins cases > Ai math > Math log1p direct 1arg
>
> Test: Math.log1p() with 1 argument

## Input

`````js filename=intro
// Input: Math.log1p(1)
// Expected: 0.6931471805599453 (log1p(1) is ln(2))
$(Math.log1p(1))
// => 0.6931471805599453
`````


## Settled


`````js filename=intro
$(0.6931471805599453);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.6931471805599453);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.6931471805599453 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log1p;
let tmpCalleeParam = 0.6931471805599453;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.6931471805599453
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
