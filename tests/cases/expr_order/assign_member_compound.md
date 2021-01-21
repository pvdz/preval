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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpNestedComplexRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let a = {};
tmpAssignMemLhsObj = a;
tmpNestedComplexRhs = $();
a = tmpNestedComplexRhs;
tmpAssignMemRhs = tmpNestedComplexRhs;
tmpCompoundAssignObj = tmpAssignMemLhsObj;
tmpCompoundAssignRhs = tmpAssignMemRhs;
{
  tmpAssignMemLhsObj_1 = tmpCompoundAssignObj;
  tmpBinaryLeft = tmpCompoundAssignObj.foo;
  tmpAssignMemRhs_1 = tmpBinaryLeft + tmpCompoundAssignRhs;
  tmpAssignMemLhsObj_1.foo = tmpAssignMemRhs_1;
}
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpNestedComplexRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let a = {};
tmpAssignMemLhsObj = a;
tmpNestedComplexRhs = $();
a = tmpNestedComplexRhs;
tmpAssignMemRhs = tmpNestedComplexRhs;
tmpCompoundAssignObj = tmpAssignMemLhsObj;
tmpCompoundAssignRhs = tmpAssignMemRhs;
tmpAssignMemLhsObj_1 = tmpCompoundAssignObj;
tmpBinaryLeft = tmpCompoundAssignObj.foo;
tmpAssignMemRhs_1 = tmpBinaryLeft + tmpCompoundAssignRhs;
tmpAssignMemLhsObj_1.foo = tmpAssignMemRhs_1;
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
