# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > binary-both > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a)[$('x')] = b) + ($(a)[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = b;
tmpBinaryLeft = b;
tmpNestedAssignComMemberObj_1 = $(a);
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = b;
tmpBinaryRight = b;
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
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
let a = { x: 10 };
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 2;
tmpBinaryLeft = 2;
tmpNestedAssignComMemberObj_1 = $(a);
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = 2;
tmpBinaryRight = 2;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
