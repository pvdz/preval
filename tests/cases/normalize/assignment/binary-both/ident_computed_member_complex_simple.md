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
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = c;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedPropAssignRhs_1 = c;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
tmpNestedComplexRhs_1 = tmpNestedPropAssignRhs_1;
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
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedPropAssignRhs_1 = 3;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
tmpNestedComplexRhs_1 = tmpNestedPropAssignRhs_1;
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
