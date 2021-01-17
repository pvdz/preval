# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > logic-both > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b)[$('x')] = $(c)[$('y')] = $(d)) && (a = $(b)[$('x')] = $(c)[$('y')] = $(d)));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpNestedAssignCompMemberObj_2;
var tmpNestedAssignCompMemberProp_2;
var tmpNestedAssignCompMemberRhs_2;
var tmpNestedAssignCompMemberObj_3;
var tmpNestedAssignCompMemberProp_3;
var tmpNestedAssignCompMemberRhs_3;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  tmpNestedAssignCompMemberObj = $(b);
  tmpNestedAssignCompMemberProp = $('x');
  tmpNestedAssignCompMemberObj_1 = $(c);
  tmpNestedAssignCompMemberProp_1 = $('y');
  tmpNestedAssignCompMemberRhs_1 = $(d);
  tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
  tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignCompMemberRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignCompMemberObj_2 = $(b);
    tmpNestedAssignCompMemberProp_2 = $('x');
    tmpNestedAssignCompMemberObj_3 = $(c);
    tmpNestedAssignCompMemberProp_3 = $('y');
    tmpNestedAssignCompMemberRhs_3 = $(d);
    tmpNestedAssignCompMemberObj_3[tmpNestedAssignCompMemberProp_3] = tmpNestedAssignCompMemberRhs_3;
    tmpNestedAssignCompMemberRhs_2 = tmpNestedAssignCompMemberRhs_3;
    tmpNestedAssignCompMemberObj_2[tmpNestedAssignCompMemberProp_2] = tmpNestedAssignCompMemberRhs_2;
    a = tmpNestedAssignCompMemberRhs_2;
    tmpArg = tmpNestedAssignCompMemberRhs_2;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpNestedAssignCompMemberObj_2;
var tmpNestedAssignCompMemberProp_2;
var tmpNestedAssignCompMemberRhs_2;
var tmpNestedAssignCompMemberObj_3;
var tmpNestedAssignCompMemberProp_3;
var tmpNestedAssignCompMemberRhs_3;
let a = 1;
let b = { x: 2 };
tmpNestedAssignCompMemberObj = $(b);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberObj_1 = $(3);
tmpNestedAssignCompMemberProp_1 = $('y');
tmpNestedAssignCompMemberRhs_1 = $(4);
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
a = tmpNestedAssignCompMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignCompMemberRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignCompMemberObj_2 = $(b);
  tmpNestedAssignCompMemberProp_2 = $('x');
  tmpNestedAssignCompMemberObj_3 = $(3);
  tmpNestedAssignCompMemberProp_3 = $('y');
  tmpNestedAssignCompMemberRhs_3 = $(4);
  tmpNestedAssignCompMemberObj_3[tmpNestedAssignCompMemberProp_3] = tmpNestedAssignCompMemberRhs_3;
  tmpNestedAssignCompMemberRhs_2 = tmpNestedAssignCompMemberRhs_3;
  tmpNestedAssignCompMemberObj_2[tmpNestedAssignCompMemberProp_2] = tmpNestedAssignCompMemberRhs_2;
  a = tmpNestedAssignCompMemberRhs_2;
  tmpArg = tmpNestedAssignCompMemberRhs_2;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 3, 4);
`````
