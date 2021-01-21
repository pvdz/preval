# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > binary-both > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a[$('x')] = b + c) + (a[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = b + c;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryLeft = tmpNestedAssignCompMemberRhs;
tmpNestedAssignComMemberObj_1 = a;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = b + c;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpBinaryRight = tmpNestedAssignCompMemberRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = { x: 10 };
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = 8;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryLeft = tmpNestedAssignCompMemberRhs;
tmpNestedAssignComMemberObj_1 = a;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = 8;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpBinaryRight = tmpNestedAssignCompMemberRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "x"
 - 2: 10
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], ['x'], [16], [{ x: 8 }, 8, 3], null];

