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
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
var tmpComplexMemberObj_2;
var tmpNestedAssignRhs;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpComplexMemberObj_2 = $(a);
tmpComplexMemberObj_1 = $(b);
tmpComplexMemberObj = $(c);
tmpNestedAssignRhs = tmpComplexMemberObj.x;
tmpComplexMemberObj_1.x = tmpNestedAssignRhs;
tmpComplexMemberObj_2.x = tmpNestedAssignRhs;
tmpArg = tmpNestedAssignRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
var tmpComplexMemberObj_2;
var tmpNestedAssignRhs;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpComplexMemberObj_2 = $(a);
tmpComplexMemberObj_1 = $(b);
tmpComplexMemberObj = $(c);
tmpNestedAssignRhs = tmpComplexMemberObj.x;
tmpComplexMemberObj_1.x = tmpNestedAssignRhs;
tmpComplexMemberObj_2.x = tmpNestedAssignRhs;
tmpArg = tmpNestedAssignRhs;
$(tmpArg);
`````
