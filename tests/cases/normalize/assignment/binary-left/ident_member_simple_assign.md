# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > binary-left > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = b.x = $(c).y = $(d)) + 500);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignMemberObj = b;
tmpNestedAssignObj = $(c);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
tmpNestedAssignMemberRhs$1 = $(d);
tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignObj = $(3);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
tmpNestedAssignMemberRhs$1 = $(4);
tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 504
 - 3: 4,{"x":4},3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
