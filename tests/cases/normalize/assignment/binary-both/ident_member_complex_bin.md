# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > binary-both > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b).x = c + d) + (a = $(b).x = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = c + d;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj$1 = $(b);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignMemberRhs$1 = c + d;
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
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
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = 11;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj$1 = $(b);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignMemberRhs$1 = 11;
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 11);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: {"x":7}
 - 2: 14
 - 3: 7,{"x":7},3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 11 }], [{ x: 11 }], [22], [11, { x: 11 }, 11], null];

