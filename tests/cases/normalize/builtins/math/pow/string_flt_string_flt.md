# Preval test case

# string_flt_string_flt.md

> Normalize > Builtins > Math > Pow > String flt string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('3.7', '2.7'));
`````


## Settled


`````js filename=intro
$(34.209336813625086);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(34.209336813625086);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 34.209336813625086 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 34.209336813625086;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 34.209336813625086
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
