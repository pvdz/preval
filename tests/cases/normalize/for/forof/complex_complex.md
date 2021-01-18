# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x of $(b)) $(a.x);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpArg;
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForOfLhsNode;
  {
    const tmpForOfRhs = $(b);
    for (tmpForOfLhsNode of tmpForOfRhs) {
      tmpAssignMemLhsObj = $(a);
      tmpAssignMemRhs = tmpForOfLhsNode;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
      tmpArg = a.x;
      $(tmpArg);
    }
  }
}
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpArg;
let a = {};
let b = { x: 1, y: 2 };
let tmpForOfLhsNode;
const tmpForOfRhs = $(b);
for (tmpForOfLhsNode of tmpForOfRhs) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  tmpArg = a.x;
  $(tmpArg);
}
`````

## Result

Should call `$` with:
[[{ x: 1, y: 2 }], '<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
