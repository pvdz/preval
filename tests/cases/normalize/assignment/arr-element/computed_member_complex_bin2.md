# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > arr-element > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
$([ $(1)[$(2)] = $(3) ]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
tmpNestedAssignCompMemberObj = $(1);
tmpNestedAssignCompMemberProp = $(2);
tmpNestedAssignCompMemberRhs = $(3);
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpElement = tmpNestedAssignCompMemberRhs;
tmpArg = [tmpElement];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
tmpNestedAssignCompMemberObj = $(1);
tmpNestedAssignCompMemberProp = $(2);
tmpNestedAssignCompMemberRhs = $(3);
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpElement = tmpNestedAssignCompMemberRhs;
tmpArg = [tmpElement];
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], [2], [3], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
