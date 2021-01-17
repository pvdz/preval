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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpAssignMemLhsObj = b;
tmpBinaryLeft = b.x;
tmpAssignMemRhs = tmpBinaryLeft + c;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * c;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpAssignMemLhsObj = b;
tmpBinaryLeft = b.x;
tmpAssignMemRhs = tmpBinaryLeft + 3;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * 3;
$(a, b, 3);
`````
