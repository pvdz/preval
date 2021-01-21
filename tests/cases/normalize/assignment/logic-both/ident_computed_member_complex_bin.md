# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > logic-both > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b)[$('x')] = c + d) && (a = $(b)[$('x')] = c + d));
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
  tmpNestedAssignCompMemberObj = $(b);
  tmpNestedAssignCompMemberProp = $('x');
  tmpNestedAssignCompMemberRhs = c + d;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignCompMemberRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignCompMemberObj_1 = $(b);
    tmpNestedAssignCompMemberProp_1 = $('x');
    tmpNestedAssignCompMemberRhs_1 = c + d;
    tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
    a = tmpNestedAssignCompMemberRhs_1;
    tmpArg = tmpNestedAssignCompMemberRhs_1;
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
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignCompMemberObj = $(b);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = 11;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
a = tmpNestedAssignCompMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignCompMemberRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignCompMemberObj_1 = $(b);
  tmpNestedAssignCompMemberProp_1 = $('x');
  tmpNestedAssignCompMemberRhs_1 = 11;
  tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
  a = tmpNestedAssignCompMemberRhs_1;
  tmpArg = tmpNestedAssignCompMemberRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 11);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
