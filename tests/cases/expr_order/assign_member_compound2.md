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
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedCompoundComplexRhs;
let a = {};
tmpAssignMemLhsObj = a;
tmpNestedComplexRhs = $();
tmpNestedCompoundComplexRhs = a + tmpNestedComplexRhs;
a = tmpNestedCompoundComplexRhs;
tmpAssignMemRhs = tmpNestedCompoundComplexRhs;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.foo = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedCompoundComplexRhs;
let a = {};
tmpAssignMemLhsObj = a;
tmpNestedComplexRhs = $();
tmpNestedCompoundComplexRhs = a + tmpNestedComplexRhs;
a = tmpNestedCompoundComplexRhs;
tmpAssignMemRhs = tmpNestedCompoundComplexRhs;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.foo = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
