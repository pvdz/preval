# Preval test case

# nested_complex_a.md

> normalize > assignment > nested_complex_a
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = [], b = 20, c = 30;
$($(a).length = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedAssignRhs;
var tmpAssignMemberObj;
a = [];
b = 20;
c = 30;
b = c;
tmpNestedAssignRhs = b;
tmpAssignMemberObj = $(a);
tmpAssignMemberObj.length = tmpNestedAssignRhs;
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
var x = [];
var x = 8;
var x = 8;
x = x;
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
var tmpAssignMemberObj;
a = [];
b = 20;
c = 30;
b = c;
tmpNestedAssignRhs = b;
tmpAssignMemberObj = $(a);
tmpAssignMemberObj.length = tmpNestedAssignRhs;
tmpArg = tmpNestedAssignRhs;
$(tmpArg);
`````
