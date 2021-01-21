# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > binary-right > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$(500 + (a = b.x = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignMemberObj = b;
tmpNestedAssignMemberRhs = c + d;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignMemberRhs = 7;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 507
 - 1: 7,{"x":7},3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[507], [7, { x: 7 }, 7], null];
