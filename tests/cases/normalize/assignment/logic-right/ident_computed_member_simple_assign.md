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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
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
    tmpNestedAssignComMemberObj = b;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
    tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
    tmpNestedAssignObj = $(c);
    tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp_1 = $('y');
    tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
    tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignObj = $(3);
  tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp_1 = $('y');
  tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
  tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
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
 - 1: true
 - 2: 1,{"x":2},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
