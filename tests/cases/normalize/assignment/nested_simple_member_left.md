# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = {}, b = 20, c = 30;
$($(a).x = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
a = {};
b = 20;
c = 30;
tmpNestedAssignMemberObj = $(a);
b = c;
tmpNestedAssignMemberRhs = c;
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
a = {};
b = 20;
c = 30;
tmpNestedAssignMemberObj = $(a);
b = c;
tmpNestedAssignMemberRhs = c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
