# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > logic-right > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$($(true) || (a = b[$('x')] = $(c)[$('y')] = $(d)));
$(a, b, c);
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
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpNestedAssignCompMemberObj = b;
    tmpNestedAssignCompMemberProp = $('x');
    tmpNestedAssignCompMemberObj_1 = $(c);
    tmpNestedAssignCompMemberProp_1 = $('y');
    tmpNestedAssignCompMemberRhs_1 = $(d);
    tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
    tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
    tmpArg = tmpNestedAssignCompMemberRhs;
  }
}
$(tmpArg);
$(a, b, c);
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
let a = 1;
let b = { x: 2 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpNestedAssignCompMemberObj = b;
  tmpNestedAssignCompMemberProp = $('x');
  tmpNestedAssignCompMemberObj_1 = $(3);
  tmpNestedAssignCompMemberProp_1 = $('y');
  tmpNestedAssignCompMemberRhs_1 = $(4);
  tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
  tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
  tmpArg = tmpNestedAssignCompMemberRhs;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
