# Preval test case

# number_int_string_int.md

> Normalize > Builtins > Math > Pow > Number int string int
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3, '3'));
`````


## Settled


`````js filename=intro
$(27);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(27);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 27 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 27
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
