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
var tmpNestedAssignObj$1;
var tmpNestedPropCompoundComplexRhs$1;
var tmpBinaryLeft$1;
var tmpBinaryRight$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpNestedAssignObj$1 = $(c);
tmpBinaryLeft$1 = tmpNestedAssignObj$1.y;
tmpBinaryRight$1 = $(d);
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$1 - tmpBinaryRight$1;
tmpNestedAssignObj$1.y = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs$1;
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
var tmpNestedAssignObj$1;
var tmpNestedPropCompoundComplexRhs$1;
var tmpBinaryLeft$1;
var tmpBinaryRight$1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpNestedAssignObj$1 = $(3);
tmpBinaryLeft$1 = tmpNestedAssignObj$1.y;
tmpBinaryRight$1 = $(4);
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$1 - tmpBinaryRight$1;
tmpNestedAssignObj$1.y = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs$1;
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
