# Preval test case

# parseint_foo.md

> Normalize > Builtins > Globals with primitives > Parseint foo
>
> Calling parseInt on a primitive should resolve

## Input

`````js filename=intro
$(parseInt("foo"));
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
