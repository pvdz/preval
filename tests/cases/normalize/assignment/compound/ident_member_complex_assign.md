# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > stmt > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= $(b).x += $(c).y -= $(d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj_1;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpNestedAssignObj_1 = $(c);
tmpBinaryLeft_1 = tmpNestedAssignObj_1.y;
tmpBinaryRight_1 = $(d);
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_1 - tmpBinaryRight_1;
tmpNestedAssignObj_1.y = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj_1;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpNestedAssignObj_1 = $(3);
tmpBinaryLeft_1 = tmpNestedAssignObj_1.y;
tmpBinaryRight_1 = $(4);
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_1 - tmpBinaryRight_1;
tmpNestedAssignObj_1.y = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":null}
 - 1: 3
 - 2: 4
 - 3: null,{"x":null},3,4
 - 4: undefined

Normalized calls: Same

Final output calls: Same
