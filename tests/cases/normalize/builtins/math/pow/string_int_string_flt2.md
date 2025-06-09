# Preval test case

# string_int_string_flt2.md

> Normalize > Builtins > Math > Pow > String int string flt2
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('3.123456789', '5.123456789'));
`````


## Settled


`````js filename=intro
$(342.1713328755235);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(342.1713328755235);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 342.1713328755235 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 342.1713328755235;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 342.1713328755235
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
