# Preval test case

# ident_ident_assign.md

> normalize > assignment > ternary-c > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$($(false) ? true : (a = b = $(c).y = $(d)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignObj = $(c);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(d);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs_1;
  tmpNestedComplexRhs = tmpNestedComplexRhs_1;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
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
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignObj = $(3);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(4);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs_1;
  tmpNestedComplexRhs = tmpNestedComplexRhs_1;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: 3
 - 2: 4
 - 3: 4
 - 4: 4,4,3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
