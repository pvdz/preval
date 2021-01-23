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
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropCompoundComplexRhs;
var tmpNestedPropCompoundComplexRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpNestedAssignObj$1 = $(c);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$1 = $('y');
tmpBinaryLeft$1 = tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1];
tmpBinaryRight$1 = $(d);
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$1 - tmpBinaryRight$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs$1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropCompoundComplexRhs;
var tmpNestedPropCompoundComplexRhs$1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpNestedAssignObj$1 = $(3);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$1 = $('y');
tmpBinaryLeft$1 = tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1];
tmpBinaryRight$1 = $(4);
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$1 - tmpBinaryRight$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs$1;
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
