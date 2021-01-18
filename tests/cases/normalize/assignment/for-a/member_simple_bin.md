# Preval test case

# member_simple_bin.md

> normalize > assignment > for-a > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (a.x = b + c;false;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = a;
  tmpAssignMemRhs = b + c;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  while (false) {}
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
while (false) {}
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[{ x: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }, 5, 3], null];

