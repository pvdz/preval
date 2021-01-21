# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > stmt > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
a *= $(b).x += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignObj = $(b);
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + c;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + 3;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: 5,{"x":5},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
