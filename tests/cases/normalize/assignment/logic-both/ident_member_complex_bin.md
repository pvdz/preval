# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > logic-both > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b).x = c + d) && (a = $(b).x = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  tmpNestedAssignMemberObj = $(b);
  tmpNestedAssignMemberRhs = c + d;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignMemberObj_1 = $(b);
    tmpNestedAssignMemberRhs_1 = c + d;
    tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
    a = tmpNestedAssignMemberRhs_1;
    tmpArg = tmpNestedAssignMemberRhs_1;
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
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignMemberRhs = 11;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignMemberObj_1 = $(b);
  tmpNestedAssignMemberRhs_1 = 11;
  tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
  a = tmpNestedAssignMemberRhs_1;
  tmpArg = tmpNestedAssignMemberRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 11);
`````
