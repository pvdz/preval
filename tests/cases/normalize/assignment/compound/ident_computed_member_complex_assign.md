# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= $(b)[$('x')] += $(c)[$('y')] -= $(d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpNestedAssignObj_1 = $(c);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('y');
tmpBinaryLeft_1 = tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1];
tmpBinaryRight_1 = $(d);
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_1 - tmpBinaryRight_1;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpNestedAssignObj_1 = $(3);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('y');
tmpBinaryLeft_1 = tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1];
tmpBinaryRight_1 = $(4);
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_1 - tmpBinaryRight_1;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":null}
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: null,{"x":null},3,4
 - 6: undefined

Normalized calls: Same

Final output calls: Same
