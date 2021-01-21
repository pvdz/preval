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
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpCompoundAssignObj = $(a);
tmpCompoundAssignRhs = b;
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
tmpCompoundAssignRhs = 2;
tmpAssignMemLhsObj = tmpCompoundAssignObj;
tmpBinaryLeft = tmpCompoundAssignObj.x;
tmpAssignMemRhs = tmpBinaryLeft * tmpCompoundAssignRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":20}
 - 1: {"x":20},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
