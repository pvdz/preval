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
var tmpAssignMemRhs;
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = b + c;
tmpCompoundAssignObj = tmpAssignMemLhsObj;
tmpCompoundAssignRhs = tmpAssignMemRhs;
{
  tmpAssignMemLhsObj_1 = tmpCompoundAssignObj;
  tmpBinaryLeft = tmpCompoundAssignObj.x;
  tmpAssignMemRhs_1 = tmpBinaryLeft * tmpCompoundAssignRhs;
  tmpAssignMemLhsObj_1.x = tmpAssignMemRhs_1;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let a = { x: 10 };
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = 5;
tmpCompoundAssignObj = tmpAssignMemLhsObj;
tmpCompoundAssignRhs = tmpAssignMemRhs;
tmpAssignMemLhsObj_1 = tmpCompoundAssignObj;
tmpBinaryLeft = tmpCompoundAssignObj.x;
tmpAssignMemRhs_1 = tmpBinaryLeft * tmpCompoundAssignRhs;
tmpAssignMemLhsObj_1.x = tmpAssignMemRhs_1;
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[{ x: 50 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 50 }, 5, 3], null];

