# Preval test case

# member_simple_simple.md

> normalize > assignment > stmt > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
a.x *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = a;
  tmpBinaryLeft = a.x;
  tmpAssignMemRhs = tmpBinaryLeft * b;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = { x: 10 };
tmpAssignMemLhsObj = a;
tmpBinaryLeft = a.x;
tmpAssignMemRhs = tmpBinaryLeft * 2;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 20 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
