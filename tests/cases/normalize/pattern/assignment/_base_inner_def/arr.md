# Preval test case

# arr.md

> Normalize > Pattern > Assignment > Base inner def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([ x = a ] = [1]);
`````


## Settled


`````js filename=intro
x = 1;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
`````


## PST Settled
With rename=true

`````js filename=intro
x = 1;
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


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
