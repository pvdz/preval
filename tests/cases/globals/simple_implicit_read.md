# Preval test case

# simple_implicit_read.md

> Globals > Simple implicit read
>
> Reading from an implicit global

## Input

`````js filename=intro
$(a);
`````


## Settled


`````js filename=intro
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
$( a );
`````


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
