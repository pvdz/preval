# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > obj-spread > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$({...((a, $(b)).c = (a, b).c = d)});
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
a;
tmpNestedAssignObj_1 = b;
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpObjSpreadArg = tmpNestedAssignMemberRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj_1 = b;
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpObjSpreadArg = tmpNestedAssignMemberRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {}
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
