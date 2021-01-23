# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > logic-both > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b).x = $(c).y = $(d)) && (a = $(b).x = $(c).y = $(d)));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberObj$3;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignMemberRhs$3;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignObj$3;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(c);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignMemberRhs$1 = $(d);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignObj$2 = $(b);
    tmpNestedAssignMemberObj$2 = tmpNestedAssignObj$2;
    tmpNestedAssignObj$3 = $(c);
    tmpNestedAssignMemberObj$3 = tmpNestedAssignObj$3;
    tmpNestedAssignMemberRhs$3 = $(d);
    tmpNestedAssignMemberObj$3.y = tmpNestedAssignMemberRhs$3;
    tmpNestedAssignMemberRhs$2 = tmpNestedAssignMemberRhs$3;
    tmpNestedAssignMemberObj$2.x = tmpNestedAssignMemberRhs$2;
    a = tmpNestedAssignMemberRhs$2;
    tmpArg = tmpNestedAssignMemberRhs$2;
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberObj$3;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignMemberRhs$3;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignObj$3;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = $(3);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignMemberRhs$1 = $(4);
tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignObj$2 = $(b);
  tmpNestedAssignMemberObj$2 = tmpNestedAssignObj$2;
  tmpNestedAssignObj$3 = $(3);
  tmpNestedAssignMemberObj$3 = tmpNestedAssignObj$3;
  tmpNestedAssignMemberRhs$3 = $(4);
  tmpNestedAssignMemberObj$3.y = tmpNestedAssignMemberRhs$3;
  tmpNestedAssignMemberRhs$2 = tmpNestedAssignMemberRhs$3;
  tmpNestedAssignMemberObj$2.x = tmpNestedAssignMemberRhs$2;
  a = tmpNestedAssignMemberRhs$2;
  tmpArg = tmpNestedAssignMemberRhs$2;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: 3
 - 2: 4
 - 3: {"x":4}
 - 4: 3
 - 5: 4
 - 6: 4
 - 7: 4,{"x":4},3,4
 - 8: undefined

Normalized calls: Same

Final output calls: Same
