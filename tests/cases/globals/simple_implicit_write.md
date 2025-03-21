# Preval test case

# simple_implicit_write.md

> Globals > Simple implicit write
>
> Writing to an implicit global

## Input

`````js filename=intro
$(a = 5);
`````


## Settled


`````js filename=intro
a = 5;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = 5;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
a = 5;
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
