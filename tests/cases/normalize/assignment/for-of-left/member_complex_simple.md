# Preval test case

# member_complex_simple.md

> normalize > assignment > for-of-left > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (($(a).x = b).x of []);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    tmpNestedAssignObj = $(a);
    tmpNestedAssignObj.x = b;
    tmpAssignMemLhsObj = b;
    tmpAssignMemRhs = tmpForOfLhsNode;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = { x: 10 };
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  tmpNestedAssignObj = $(a);
  tmpNestedAssignObj.x = 2;
  tmpAssignMemLhsObj = 2;
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
