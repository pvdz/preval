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
var tmpObj;
var tmpObj_1;
var tmpObj_2;
var tmpNestedAssignRhs;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpObj_2 = $(a);
tmpObj_1 = $(b);
tmpObj = $(c);
tmpNestedAssignRhs = tmpObj.x;
tmpObj_1.x = tmpNestedAssignRhs;
tmpObj_2.x = tmpNestedAssignRhs;
tmpArg = tmpNestedAssignRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
var tmpObj_1;
var tmpObj_2;
var tmpNestedAssignRhs;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpObj_2 = $(a);
tmpObj_1 = $(b);
tmpObj = $(c);
tmpNestedAssignRhs = tmpObj.x;
tmpObj_1.x = tmpNestedAssignRhs;
tmpObj_2.x = tmpNestedAssignRhs;
tmpArg = tmpNestedAssignRhs;
$(tmpArg);
`````
