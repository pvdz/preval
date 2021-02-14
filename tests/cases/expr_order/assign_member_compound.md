# Preval test case

# order.md

> assignment > order
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

#TODO

## Input

`````js filename=intro
let a = {};
a.foo += a = $();
`````

## Normalized

`````js filename=intro
let a = {};
const tmpCompoundAssignLhs = a.foo;
const tmpAssignMemLhsObj = a;
const tmpBinBothLhs = tmpCompoundAssignLhs;
a = $();
let tmpBinBothRhs = a;
const tmpAssignMemRhs = tmpBinBothLhs + tmpBinBothRhs;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
let a = {};
const tmpCompoundAssignLhs = a.foo;
const tmpAssignMemLhsObj = a;
a = $();
let tmpBinBothRhs = a;
const tmpAssignMemRhs = tmpCompoundAssignLhs + tmpBinBothRhs;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
