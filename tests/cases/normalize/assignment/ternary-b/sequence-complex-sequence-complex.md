# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > ternary-b > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$($(true) ? ((a, $(b)).c = (a, $(b)).c = d) : false);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  a;
  tmpNestedAssignMemberObj = $(b);
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = d;
  tmpNestedAssignMemberRhs = d;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpTernaryConsequent = tmpNestedAssignMemberRhs;
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignMemberObj = $(b);
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = 3;
  tmpNestedAssignMemberRhs = 3;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpTernaryConsequent = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: false
 - 2: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same