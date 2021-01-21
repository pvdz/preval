# Preval test case

# member_complex_bin.md

> normalize > assignment > logic-both > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a).x = b + c) && ($(a).x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpAssignMemLhsObj_3;
var tmpAssignMemLhsObj_4;
var tmpAssignMemRhs_1;
var tmpAssignMemLhsObj_5;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
  tmpAssignMemRhs = b + c;
  tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
  tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignMemLhsObj_3 = $(a);
    tmpAssignMemLhsObj_4 = tmpAssignMemLhsObj_3;
    tmpAssignMemRhs_1 = b + c;
    tmpAssignMemLhsObj_5 = tmpAssignMemLhsObj_4;
    tmpNestedPropAssignRhs = tmpAssignMemRhs_1;
    tmpAssignMemLhsObj_5.x = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpAssignMemLhsObj_3;
var tmpAssignMemLhsObj_4;
var tmpAssignMemRhs_1;
var tmpAssignMemLhsObj_5;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = 8;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj_3 = $(a);
  tmpAssignMemLhsObj_4 = tmpAssignMemLhsObj_3;
  tmpAssignMemRhs_1 = 8;
  tmpAssignMemLhsObj_5 = tmpAssignMemLhsObj_4;
  tmpNestedPropAssignRhs = tmpAssignMemRhs_1;
  tmpAssignMemLhsObj_5.x = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: {"x":5}
 - 2: 5
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 8 }], [{ x: 8 }], [8], [{ x: 8 }, 8, 3], null];

