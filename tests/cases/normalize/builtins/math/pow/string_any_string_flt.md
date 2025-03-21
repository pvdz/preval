# Preval test case

# string_any_string_flt.md

> Normalize > Builtins > Math > Pow > String any string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('nope', '3.2'));
`````


## Settled


`````js filename=intro
$(NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( NaN );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
