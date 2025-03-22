# Preval test case

# obj.md

> Normalize > Pattern > Assignment > Base alias > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x: a } = 1)
`````


## Settled


`````js filename=intro
a = (1).x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = (1).x;
`````


## PST Settled
With rename=true

`````js filename=intro
a = (1).x;
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
