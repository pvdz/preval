# Preval test case

# member_simple_bin.md

> normalize > assignment > binary-right > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(500 + (a.x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpBinaryRight = tmpNestedAssignMemberRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpBinaryRight = tmpNestedAssignMemberRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 505
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[505], [{ x: 5 }, 5, 3], null];
