# Preval test case

# object_plus.md

> Tofix > object plus
>
> The order of occurrence is relevant.

Adding a predictable object literal to anything else results in a concatenation
of `[Object object]` with that something else, regardless of the rhs.
This may only be different when the object has a toString or valueOf or when
the prototype has these overridden, of course. We assume that's not the case.

## Input

`````js filename=intro
let a = {};
a.foo = a += $();
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $();
const a /*:object*/ = {};
const tmpClusterSSA_a /*:primitive*/ = a + tmpBinBothRhs;
a.foo = tmpClusterSSA_a;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $();
const a = {};
a.foo = a + tmpBinBothRhs;
`````

## Pre Normal


`````js filename=intro
let a = {};
a.foo = a += $();
`````

## Normalized


`````js filename=intro
let a = {};
const tmpAssignMemLhsObj = a;
const tmpBinBothLhs = a;
const tmpBinBothRhs = $();
a = tmpBinBothLhs + tmpBinBothRhs;
let tmpAssignMemRhs = a;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = {};
const c = b + a;
b.foo = c;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
