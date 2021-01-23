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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$3;
var tmpNestedAssignMemberRhs$3;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = $(c);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs$1 = $(d);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignMemberObj$2 = b;
    tmpNestedAssignObj$1 = $(c);
    tmpNestedAssignMemberObj$3 = tmpNestedAssignObj$1;
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
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$3;
var tmpNestedAssignMemberRhs$3;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignObj = $(3);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
tmpNestedAssignMemberRhs$1 = $(4);
tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignMemberObj$2 = b;
  tmpNestedAssignObj$1 = $(3);
  tmpNestedAssignMemberObj$3 = tmpNestedAssignObj$1;
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
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 3
 - 3: 4
 - 4: 4
 - 5: 4,{"x":4},3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
