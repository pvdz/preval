# Preval test case

# member_simple_bin.md

> normalize > assignment > binary-both > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a.x = b + c) + (a.x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
tmpNestedAssignMemberObj_1 = a;
tmpNestedAssignMemberRhs_1 = b + c;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpBinaryRight = tmpNestedAssignMemberRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = { x: 10 };
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = 8;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
tmpNestedAssignMemberObj_1 = a;
tmpNestedAssignMemberRhs_1 = 8;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpBinaryRight = tmpNestedAssignMemberRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
[[10], [{ x: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[16], [{ x: 8 }, 8, 3], null];

