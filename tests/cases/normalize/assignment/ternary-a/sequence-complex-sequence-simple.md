# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > ternary-a > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$( ((a, $(b)).c = (a, b).c = d ) ? true : false);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpTernaryTest;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
a;
tmpNestedAssignObj$1 = b;
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpTernaryTest = tmpNestedAssignMemberRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpTernaryTest;
let b = { c: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = b;
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpTernaryTest = tmpNestedAssignMemberRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: true
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
