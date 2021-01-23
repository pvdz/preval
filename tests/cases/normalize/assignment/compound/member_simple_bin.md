# Preval test case

# member_simple_bin.md

> normalize > assignment > stmt > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
a.x *= b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpCompoundAssignLhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpCompoundAssignLhs = a.x;
tmpAssignMemLhsObj = a;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = b + c;
tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpCompoundAssignLhs;
let a = { x: 10 };
tmpCompoundAssignLhs = a.x;
tmpAssignMemLhsObj = a;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = 5;
tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":50},2,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 50 }, 5, 3], null];

