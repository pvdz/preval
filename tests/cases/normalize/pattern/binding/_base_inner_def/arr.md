# Preval test case

# arr.md

> Normalize > Pattern > Binding > Base inner def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [ x = a ] = [];
`````


## Settled


`````js filename=intro
a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a;
`````


## PST Settled
With rename=true

`````js filename=intro
a;
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read


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
