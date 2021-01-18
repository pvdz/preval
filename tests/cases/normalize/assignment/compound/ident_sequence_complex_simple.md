# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
a *= ($(b), $(c)).x += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedAssignObj = $(c);
tmpAssignMemLhsObj = tmpNestedAssignObj;
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpAssignMemRhs = tmpBinaryLeft + c;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * c;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpAssignMemLhsObj = tmpNestedAssignObj;
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpAssignMemRhs = tmpBinaryLeft + 3;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * 3;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[2], [3], "<crash[ Cannot read property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
