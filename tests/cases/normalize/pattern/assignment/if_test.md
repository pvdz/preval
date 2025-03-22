# Preval test case

# if_test.md

> Normalize > Pattern > Assignment > If test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
if (({ x } = 1)) y;
`````


## Settled


`````js filename=intro
x = (1).x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = (1).x;
`````


## PST Settled
With rename=true

`````js filename=intro
x = (1).x;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
