# Preval test case

# negative_zero.md

> Normalize > Builtins > Math > Pow > Negative zero
>
> Static expressions can be inlined under certain conditions

This ought to return -0.

## Input

`````js filename=intro
$(Math.pow(-0, 1));
`````


## Settled


`````js filename=intro
$(-0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = -0;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) precision loss detected 2


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
