# Preval test case

# string_flt_string_int.md

> Normalize > Builtins > Math > Pow > String flt string int
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('3.7', '2'));
`````


## Settled


`````js filename=intro
$(13.690000000000001);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(13.690000000000001);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 13.690000000000001 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 13.690000000000001;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 13.690000000000001
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
