# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > logic-both > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = b.x = $(c).y = $(d)) && (a = b.x = $(c).y = $(d)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
var tmpNestedAssignMemberObj_3;
var tmpNestedAssignMemberRhs_3;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignMemberObj_1 = $(c);
  tmpNestedAssignMemberRhs_1 = $(d);
  tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignMemberObj_2 = b;
    tmpNestedAssignMemberObj_3 = $(c);
    tmpNestedAssignMemberRhs_3 = $(d);
    tmpNestedAssignMemberObj_3.y = tmpNestedAssignMemberRhs_3;
    tmpNestedAssignMemberRhs_2 = tmpNestedAssignMemberRhs_3;
    tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
    a = tmpNestedAssignMemberRhs_2;
    tmpArg = tmpNestedAssignMemberRhs_2;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
var tmpNestedAssignMemberObj_3;
var tmpNestedAssignMemberRhs_3;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignMemberObj_1 = $(3);
tmpNestedAssignMemberRhs_1 = $(4);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignMemberObj_2 = b;
  tmpNestedAssignMemberObj_3 = $(3);
  tmpNestedAssignMemberRhs_3 = $(4);
  tmpNestedAssignMemberObj_3.y = tmpNestedAssignMemberRhs_3;
  tmpNestedAssignMemberRhs_2 = tmpNestedAssignMemberRhs_3;
  tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
  a = tmpNestedAssignMemberRhs_2;
  tmpArg = tmpNestedAssignMemberRhs_2;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 3);
`````
