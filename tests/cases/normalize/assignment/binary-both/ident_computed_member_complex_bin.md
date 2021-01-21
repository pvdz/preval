# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > binary-both > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b)[$('x')] = c + d) + (a = $(b)[$('x')] = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = c + d;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = c + d;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedComplexRhs_1 = tmpNestedAssignCompMemberRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = 11;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = 11;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedComplexRhs_1 = tmpNestedAssignCompMemberRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 11);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: "x"
 - 2: {"x":7}
 - 3: "x"
 - 4: 14
 - 5: 7,{"x":7},3
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 11 }], ['x'], [{ x: 11 }], ['x'], [22], [11, { x: 11 }, 11], null];

