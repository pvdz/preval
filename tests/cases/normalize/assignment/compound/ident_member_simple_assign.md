# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > stmt > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= b.x += $(c).y -= $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpBinaryLeft = b.x;
tmpNestedAssignObj = $(c);
tmpBinaryLeft_1 = tmpNestedAssignObj.y;
tmpBinaryRight_1 = $(d);
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_1 - tmpBinaryRight_1;
tmpNestedAssignObj.y = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
b.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
let a = 1;
let b = { x: 2 };
tmpBinaryLeft = b.x;
tmpNestedAssignObj = $(3);
tmpBinaryLeft_1 = tmpNestedAssignObj.y;
tmpBinaryRight_1 = $(4);
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_1 - tmpBinaryRight_1;
tmpNestedAssignObj.y = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
b.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: null,{"x":null},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
