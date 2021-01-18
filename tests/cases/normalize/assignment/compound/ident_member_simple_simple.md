# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > stmt > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
a *= b.x += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedPropAssignRhs = c;
tmpAssignMemLhsObj = b;
tmpBinaryLeft = b.x;
tmpAssignMemRhs = tmpBinaryLeft + tmpNestedPropAssignRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpNestedPropAssignRhs = 3;
tmpAssignMemLhsObj = b;
tmpBinaryLeft = b.x;
tmpAssignMemRhs = tmpBinaryLeft + tmpNestedPropAssignRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * tmpNestedPropAssignRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
[[5, { x: 5 }, 3], null];

Normalized calls: BAD?!
[[3, { x: 5 }, 3], null];

Final output calls: BAD!!
[[3, { x: 5 }, 3], null];

