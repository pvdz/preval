# Preval test case

# number_fl_string_flt.md

> Normalize > Builtins > Math > Pow > Number fl string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3.3, '4.3'));
`````


## Settled


`````js filename=intro
$(169.67190716541973);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(169.67190716541973);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 169.67190716541973 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 169.67190716541973;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 169.67190716541973
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
