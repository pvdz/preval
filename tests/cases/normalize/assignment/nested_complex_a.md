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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
a = [];
b = 20;
c = 30;
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
b = c;
tmpNestedAssignMemberRhs = c;
tmpNestedAssignMemberObj.length = tmpNestedAssignMemberRhs;
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
a = [];
b = 20;
c = 30;
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
b = c;
tmpNestedAssignMemberRhs = c;
tmpNestedAssignMemberObj.length = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
 - 1: 30
 - 2: undefined

Normalized calls: Same

Final output calls: Same
