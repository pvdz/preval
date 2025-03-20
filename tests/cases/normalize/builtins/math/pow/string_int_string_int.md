# Preval test case

# string_int_string_int.md

> Normalize > Builtins > Math > Pow > String int string int
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('3', '5'));
`````


## Settled


`````js filename=intro
$(243);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(243);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 243 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 243
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
