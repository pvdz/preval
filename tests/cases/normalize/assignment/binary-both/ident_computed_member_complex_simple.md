# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > binary-both > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = $(b)[$('x')] = c) + (a = $(b)[$('x')] = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedComplexRhs_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignComMemberObj = $(b);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignComMemberObj_1 = $(b);
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = c;
tmpNestedComplexRhs_1 = c;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedComplexRhs_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = $(b);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignComMemberObj_1 = $(b);
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = 3;
tmpNestedComplexRhs_1 = 3;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: "x"
 - 2: {"x":3}
 - 3: "x"
 - 4: 6
 - 5: 3,{"x":3},3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
