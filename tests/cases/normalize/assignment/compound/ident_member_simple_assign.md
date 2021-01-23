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
var tmpNestedPropCompoundComplexRhs$1;
var tmpBinaryLeft$1;
var tmpBinaryRight$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpBinaryLeft = b.x;
tmpNestedAssignObj = $(c);
tmpBinaryLeft$1 = tmpNestedAssignObj.y;
tmpBinaryRight$1 = $(d);
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$1 - tmpBinaryRight$1;
tmpNestedAssignObj.y = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs$1;
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
var tmpNestedPropCompoundComplexRhs$1;
var tmpBinaryLeft$1;
var tmpBinaryRight$1;
let a = 1;
let b = { x: 2 };
tmpBinaryLeft = b.x;
tmpNestedAssignObj = $(3);
tmpBinaryLeft$1 = tmpNestedAssignObj.y;
tmpBinaryRight$1 = $(4);
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$1 - tmpBinaryRight$1;
tmpNestedAssignObj.y = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs$1;
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
