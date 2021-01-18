# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = {x:1}, b = {x:2}, c = {x:3};
$($(a).x = $(b).x = $(c).x);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpMemberComplexObj;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpNestedAssignMemberObj = $(a);
tmpNestedAssignMemberObj_1 = $(b);
tmpMemberComplexObj = $(c);
tmpNestedAssignMemberRhs_1 = tmpMemberComplexObj.x;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpMemberComplexObj;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpNestedAssignMemberObj = $(a);
tmpNestedAssignMemberObj_1 = $(b);
tmpMemberComplexObj = $(c);
tmpNestedAssignMemberRhs_1 = tmpMemberComplexObj.x;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
[[{ x: 1 }], [{ x: 2 }], [{ x: 3 }], "<crash[ Cannot read property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
