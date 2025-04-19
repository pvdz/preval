# Preval test case

# isarray_with_primitives.md

> Array > Static context > Isarray with primitives
>
> Array.isArray check

## Input

`````js filename=intro
$(Array.isArray([1,2,3]));
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_isArray


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
