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
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
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
tmpNestedAssignComMemberObj$1 = a;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
let a = { x: 10 };
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = 8;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryLeft = tmpNestedAssignCompMemberRhs;
tmpNestedAssignComMemberObj$1 = a;
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
 - 0: "x"
 - 1: "x"
 - 2: 10
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], ['x'], [16], [{ x: 8 }, 8, 3], null];

