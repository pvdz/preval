# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 1}, b = {x: 10}, c = {x: 100}, d = 1000;
$(a, 'a').x += $(b, 'b').x += $(c, 'c').x += $(d, 'd');
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
var tmpNestedAssignObj_1;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_2;
var tmpBinaryRight_2;
let a = { x: 1 };
let b = { x: 10 };
let c = { x: 100 };
let d = 1000;
tmpAssignMemLhsObj = $(a, 'a');
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b');
tmpBinaryLeft_1 = tmpNestedAssignObj.x;
tmpNestedAssignObj_1 = $(c, 'c');
tmpBinaryLeft_2 = tmpNestedAssignObj_1.x;
tmpBinaryRight_2 = $(d, 'd');
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_2 + tmpBinaryRight_2;
tmpNestedAssignObj_1.x = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight_1 = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft_1 + tmpBinaryRight_1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
var tmpNestedAssignObj_1;
var tmpNestedPropCompoundComplexRhs_1;
var tmpBinaryLeft_2;
var tmpBinaryRight_2;
let a = { x: 1 };
let b = { x: 10 };
let c = { x: 100 };
tmpAssignMemLhsObj = $(a, 'a');
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b');
tmpBinaryLeft_1 = tmpNestedAssignObj.x;
tmpNestedAssignObj_1 = $(c, 'c');
tmpBinaryLeft_2 = tmpNestedAssignObj_1.x;
tmpBinaryRight_2 = $(1000, 'd');
tmpNestedPropCompoundComplexRhs_1 = tmpBinaryLeft_2 + tmpBinaryRight_2;
tmpNestedAssignObj_1.x = tmpNestedPropCompoundComplexRhs_1;
tmpBinaryRight_1 = tmpNestedPropCompoundComplexRhs_1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft_1 + tmpBinaryRight_1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
$(a, b, c, 1000);
`````

## Result

Should call `$` with:
 - 0: {"x":1111},"a"
 - 1: {"x":1110},"b"
 - 2: {"x":1100},"c"
 - 3: 1000,"d"
 - 4: {"x":1111},{"x":1110},{"x":1100},1000
 - 5: undefined

Normalized calls: Same

Final output calls: Same
