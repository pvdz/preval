# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > obj-prop-init > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$({foo: (a, $(b)).c = (a, b).c = d});
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpNestedAssignMemberObj = $(b);
a;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = d;
tmpNestedAssignMemberRhs = d;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpObjPropValue = tmpNestedAssignMemberRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpNestedAssignMemberRhs = 3;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpObjPropValue = tmpNestedAssignMemberRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[{ c: 3 }], "<crash[ Cannot set property 'c' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
