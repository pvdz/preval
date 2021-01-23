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
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryLeft$2;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpBinaryRight$2;
var tmpCompoundAssignLhs;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropCompoundComplexRhs;
var tmpNestedPropCompoundComplexRhs$1;
let a = { x: 1 };
let b = { x: 10 };
let c = { x: 100 };
let d = 1000;
tmpAssignMemLhsObj = $(a, 'a');
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b');
tmpBinaryLeft$1 = tmpNestedAssignObj.x;
tmpNestedAssignObj$1 = $(c, 'c');
tmpBinaryLeft$2 = tmpNestedAssignObj$1.x;
tmpBinaryRight$2 = $(d, 'd');
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$2 + tmpBinaryRight$2;
tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight$1 = tmpNestedPropCompoundComplexRhs$1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft$1 + tmpBinaryRight$1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryLeft$2;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpBinaryRight$2;
var tmpCompoundAssignLhs;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropCompoundComplexRhs;
var tmpNestedPropCompoundComplexRhs$1;
let a = { x: 1 };
let b = { x: 10 };
let c = { x: 100 };
tmpAssignMemLhsObj = $(a, 'a');
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b');
tmpBinaryLeft$1 = tmpNestedAssignObj.x;
tmpNestedAssignObj$1 = $(c, 'c');
tmpBinaryLeft$2 = tmpNestedAssignObj$1.x;
tmpBinaryRight$2 = $(1000, 'd');
tmpNestedPropCompoundComplexRhs$1 = tmpBinaryLeft$2 + tmpBinaryRight$2;
tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
tmpBinaryRight$1 = tmpNestedPropCompoundComplexRhs$1;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft$1 + tmpBinaryRight$1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
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
