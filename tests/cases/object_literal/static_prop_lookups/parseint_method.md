# Preval test case

# parseint_method.md

> Object literal > Static prop lookups > Parseint method
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  f: parseInt,
};
$(o.f("200", 15));
`````


## Settled


`````js filename=intro
$(450);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(450);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 450 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 450
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
