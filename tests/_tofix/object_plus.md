# Preval test case

# object_plus.md

> Tofix > Object plus
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

## Output


`````js filename=intro
const tmpBinBothRhs = $();
const a /*:object*/ = {};
const tmpClusterSSA_a /*:primitive*/ = a + tmpBinBothRhs;
a.foo = tmpClusterSSA_a;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = {};
const c = b + a;
b.foo = c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
