# Preval test case

# member_complex_simple.md

> normalize > assignment > stmt > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(a).x *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignMemLhsObj = $(a);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = tmpCompoundAssignLhs * b;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = tmpCompoundAssignLhs * 2;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":20}
 - 1: {"x":20},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
