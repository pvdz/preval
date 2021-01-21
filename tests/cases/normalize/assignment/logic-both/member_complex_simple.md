# Preval test case

# member_complex_simple.md

> normalize > assignment > logic-both > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a).x = b) && ($(a).x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemRhs = b;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignMemLhsObj_1 = $(a);
    tmpAssignMemRhs_1 = b;
    tmpNestedAssignObj = tmpAssignMemLhsObj_1;
    tmpNestedAssignObj.x = tmpAssignMemRhs_1;
    tmpArg = tmpAssignMemRhs_1;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 2;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj_1 = $(a);
  tmpAssignMemRhs_1 = 2;
  tmpNestedAssignObj = tmpAssignMemLhsObj_1;
  tmpNestedAssignObj.x = tmpAssignMemRhs_1;
  tmpArg = tmpAssignMemRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
