# Preval test case

# member_simple_simple.md

> normalize > assignment > stmt > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
a.x *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpCompoundAssignLhs = a.x;
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = tmpCompoundAssignLhs * b;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj_1.x = tmpAssignMemRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
let a = { x: 10 };
tmpCompoundAssignLhs = a.x;
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = tmpCompoundAssignLhs * 2;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj_1.x = tmpAssignMemRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":20},2,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
