# Preval test case

# member_complex_bin.md

> normalize > assignment > ternary-c > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(false) ? true : ($(a).x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignMemberObj = $(a);
  tmpNestedAssignMemberRhs = b + c;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpTernaryAlternate = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignMemberObj = $(a);
  tmpNestedAssignMemberRhs = 5;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpTernaryAlternate = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: {"x":5}
 - 2: 5
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[false], [{ x: 5 }], [5], [{ x: 5 }, 5, 3], null];

