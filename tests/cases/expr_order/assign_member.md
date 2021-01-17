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
a.foo = a = $();
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
let a = {};
tmpAssignMemLhsObj = a;
tmpNestedComplexRhs = $();
a = tmpNestedComplexRhs;
tmpAssignMemRhs = tmpNestedComplexRhs;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
let a = {};
tmpAssignMemLhsObj = a;
tmpNestedComplexRhs = $();
a = tmpNestedComplexRhs;
tmpAssignMemRhs = tmpNestedComplexRhs;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````
