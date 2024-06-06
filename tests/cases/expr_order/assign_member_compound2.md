# Preval test case

# assign_member_compound2.md

> Expr order > Assign member compound2
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

#TODO

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
const a = {};
const tmpClusterSSA_a = a + tmpBinBothRhs;
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
