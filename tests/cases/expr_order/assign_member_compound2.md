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
a.foo = a += $();
`````

## Normalized

`````js filename=intro
let a = {};
const tmpAssignMemLhsObj = a;
let tmpAssignMemRhs;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
const tmpBinBothRhs = $();
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpAssignMemRhs = tmpNestedComplexRhs;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
