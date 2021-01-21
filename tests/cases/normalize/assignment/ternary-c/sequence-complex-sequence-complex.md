# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > ternary-c > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$($(false) ? true : ((a, $(b)).c = (a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  a;
  tmpNestedAssignObj_1 = $(b);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpTernaryAlternate = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj_1 = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpTernaryAlternate = tmpNestedAssignMemberRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: {"c":3}
 - 2: {"c":3}
 - 3: 3
 - 4: 1,{"c":3},"unused",3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
