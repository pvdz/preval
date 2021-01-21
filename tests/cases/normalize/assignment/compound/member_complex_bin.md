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
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpCompoundAssignObj = $(a);
tmpCompoundAssignRhs = b + c;
{
  tmpAssignMemLhsObj = tmpCompoundAssignObj;
  tmpBinaryLeft = tmpCompoundAssignObj.x;
  tmpAssignMemRhs = tmpBinaryLeft * tmpCompoundAssignRhs;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = { x: 10 };
tmpCompoundAssignObj = $(a);
tmpCompoundAssignRhs = 5;
tmpAssignMemLhsObj = tmpCompoundAssignObj;
tmpBinaryLeft = tmpCompoundAssignObj.x;
tmpAssignMemRhs = tmpBinaryLeft * tmpCompoundAssignRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
