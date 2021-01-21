# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > binary-both > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a[$('x')] = b) + (a[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = b;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
tmpNestedAssignComMemberObj_1 = a;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedPropAssignRhs_1 = b;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
tmpBinaryRight = tmpNestedPropAssignRhs_1;
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
var tmpNestedPropAssignRhs;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = { x: 10 };
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 2;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
tmpNestedAssignComMemberObj_1 = a;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedPropAssignRhs_1 = 2;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
tmpBinaryRight = tmpNestedPropAssignRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "x"
 - 2: 4
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
