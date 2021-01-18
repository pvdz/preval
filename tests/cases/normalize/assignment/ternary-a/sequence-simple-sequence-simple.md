# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > ternary-a > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$( ((a, b).c = (a, b).c = d ) ? true : false);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpArg;
var tmpTernaryTest;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpNestedAssignMemberObj = b;
a;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = d;
tmpNestedAssignMemberRhs = d;
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpArg;
var tmpTernaryTest;
let b = { c: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpNestedAssignMemberRhs = 3;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpTernaryTest = tmpNestedAssignMemberRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[true], '<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
