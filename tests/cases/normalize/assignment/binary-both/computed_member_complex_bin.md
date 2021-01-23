# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > binary-both > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a)[$('x')] = b + c) + ($(a)[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = b + c;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryLeft = tmpNestedAssignCompMemberRhs;
tmpNestedAssignObj$1 = $(a);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$1 = $('x');
tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
tmpNestedAssignCompMemberRhs$1 = b + c;
tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
tmpBinaryRight = tmpNestedAssignCompMemberRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = 8;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryLeft = tmpNestedAssignCompMemberRhs;
tmpNestedAssignObj$1 = $(a);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$1 = $('x');
tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
tmpNestedAssignCompMemberRhs$1 = 8;
tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
tmpBinaryRight = tmpNestedAssignCompMemberRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "x"
 - 2: {"x":5}
 - 3: "x"
 - 4: 10
 - 5: {"x":5},2,3
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 8 }], ['x'], [{ x: 8 }], ['x'], [16], [{ x: 8 }, 8, 3], null];

