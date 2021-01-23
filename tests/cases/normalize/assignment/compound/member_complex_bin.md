# Preval test case

# member_complex_bin.md

> normalize > assignment > stmt > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(a).x *= b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
var tmpBinaryLeft;
var tmpBinaryRight;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignMemLhsObj = $(a);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = b + c;
tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
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
var tmpBinaryLeft;
var tmpBinaryRight;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = 5;
tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":50}
 - 1: {"x":50},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 50 }], [{ x: 50 }, 5, 3], null];

