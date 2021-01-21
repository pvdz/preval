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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
a = {};
b = 20;
c = 30;
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
a = {};
b = 20;
c = 30;
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
b = c;
tmpNestedAssignMemberRhs = c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {"x":30}
 - 1: 30
 - 2: undefined

Normalized calls: Same

Final output calls: Same
