# Preval test case

# ident_ident_assign.md

> normalize > assignment > logic-both > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$((a = b = $(c).y = $(d)) && (a = b = $(c).y = $(d)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedComplexRhs$1;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  tmpNestedAssignObj = $(c);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(d);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpAssignLogicStmtOr = tmpNestedComplexRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignObj$1 = $(c);
    tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
    tmpNestedAssignMemberRhs$1 = $(d);
    tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
    tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs$1;
    b = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs$1;
    tmpArg = tmpNestedComplexRhs$1;
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
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedComplexRhs$1;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = 2;
tmpNestedAssignObj = $(3);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = $(4);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpAssignLogicStmtOr = tmpNestedComplexRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignObj$1 = $(3);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignMemberRhs$1 = $(4);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs$1;
  b = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs$1;
  tmpArg = tmpNestedComplexRhs$1;
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
 - 5: 4,4,3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
