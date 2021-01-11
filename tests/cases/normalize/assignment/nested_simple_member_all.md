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
var tmpNestedAssignRhs;
var tmpNestedAssignRhs_1;
var tmpComplexMemberObj;
var tmpAssignMemberObj;
var tmpAssignMemberObj_1;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpComplexMemberObj = $(c);
tmpNestedAssignRhs_1 = tmpComplexMemberObj.x;
tmpAssignMemberObj = $(b);
tmpAssignMemberObj.x = tmpNestedAssignRhs_1;
tmpNestedAssignRhs = tmpNestedAssignRhs_1;
tmpAssignMemberObj_1 = $(a);
tmpAssignMemberObj_1.x = tmpNestedAssignRhs;
tmpArg = tmpNestedAssignRhs;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x = { x: 8 };
var x = { x: 8 };
var x = { x: 8 };
x = x(x);
x = x.x;
x = x(x);
x.x = x;
x = x;
x = x(x);
x.x = x;
x = x;
x(x);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedAssignRhs;
var tmpNestedAssignRhs_1;
var tmpComplexMemberObj;
var tmpAssignMemberObj;
var tmpAssignMemberObj_1;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpComplexMemberObj = $(c);
tmpNestedAssignRhs_1 = tmpComplexMemberObj.x;
tmpAssignMemberObj = $(b);
tmpAssignMemberObj.x = tmpNestedAssignRhs_1;
tmpNestedAssignRhs = tmpNestedAssignRhs_1;
tmpAssignMemberObj_1 = $(a);
tmpAssignMemberObj_1.x = tmpNestedAssignRhs;
tmpArg = tmpNestedAssignRhs;
$(tmpArg);
`````
