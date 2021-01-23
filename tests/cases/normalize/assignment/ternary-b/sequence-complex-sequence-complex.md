# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > ternary-b > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$($(true) ? ((a, $(b)).c = (a, $(b)).c = d) : false);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  a;
  tmpNestedAssignObj$1 = $(b);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpTernaryConsequent = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: {"c":3}
 - 2: {"c":3}
 - 3: 3
 - 4: 1,{"c":3},"unused",3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
