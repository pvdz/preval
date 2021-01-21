# Preval test case

# member_complex_bin.md

> normalize > assignment > ternary-b > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) ? ($(a).x = b + c) : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(a);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = b + c;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpTernaryConsequent = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(a);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = 5;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpTernaryConsequent = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: {"x":5}
 - 2: 5
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [{ x: 5 }], [5], [{ x: 5 }, 5, 3], null];

