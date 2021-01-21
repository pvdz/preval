# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for (((a, $(b)).c = d).x of []);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    {
      a;
      tmpNestedAssignObj = $(b);
      tmpNestedAssignObj.c = d;
      tmpAssignMemLhsObj = d;
      tmpAssignMemRhs = tmpForOfLhsNode;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = 3;
  tmpAssignMemLhsObj = 3;
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
