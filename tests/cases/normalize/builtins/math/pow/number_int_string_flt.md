# Preval test case

# number_int_string_flt.md

> Normalize > Builtins > Math > Pow > Number int string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3, '3.7'));
`````


## Settled


`````js filename=intro
$(58.25707055931402);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(58.25707055931402);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 58.25707055931402 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 58.25707055931402;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 58.25707055931402
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
