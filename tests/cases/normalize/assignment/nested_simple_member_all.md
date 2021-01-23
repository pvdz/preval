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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
var tmpMemberComplexObj;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = $(b);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpMemberComplexObj = $(c);
tmpNestedAssignMemberRhs$1 = tmpMemberComplexObj.x;
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
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
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
var tmpMemberComplexObj;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = $(b);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpMemberComplexObj = $(c);
tmpNestedAssignMemberRhs$1 = tmpMemberComplexObj.x;
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: {"x":3}
 - 2: {"x":3}
 - 3: 3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
