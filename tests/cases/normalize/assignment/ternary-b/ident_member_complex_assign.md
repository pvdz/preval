# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > ternary-b > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$($(true) ? (a = $(b).x = $(c).y = $(d)) : false);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(c);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignMemberRhs$1 = $(d);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = { x: 2 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(3);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignMemberRhs$1 = $(4);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: {"x":4}
 - 2: 3
 - 3: 4
 - 4: 4
 - 5: 4,{"x":4},3,4
 - 6: undefined

Normalized calls: Same

Final output calls: Same
