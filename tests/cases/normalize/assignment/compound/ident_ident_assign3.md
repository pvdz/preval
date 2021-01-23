# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 1}, b = {x: 10}, d = 1000;
$(a, 'a').x = b.x += $(d, 'd');
$(a, b, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedPropCompoundComplexRhs;
let a = { x: 1 };
let b = { x: 10 };
let d = 1000;
tmpAssignMemLhsObj = $(a, 'a');
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = b.x;
tmpBinaryRight = $(d, 'd');
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
b.x = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpNestedPropCompoundComplexRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, b, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedPropCompoundComplexRhs;
let a = { x: 1 };
let b = { x: 10 };
tmpAssignMemLhsObj = $(a, 'a');
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = b.x;
tmpBinaryRight = $(1000, 'd');
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
b.x = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpNestedPropCompoundComplexRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, b, 1000);
`````

## Result

Should call `$` with:
 - 0: {"x":1010},"a"
 - 1: 1000,"d"
 - 2: {"x":1010},{"x":1010},1000
 - 3: undefined

Normalized calls: Same

Final output calls: Same
