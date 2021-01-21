# Preval test case

# member_complex_bin.md

> normalize > assignment > call-spread > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(...($(a).x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(...tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg = tmpNestedAssignMemberRhs;
$(...tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: <crash[ Found non-callable @@iterator ]>

Normalized calls: Same

Final output calls: Same
