# Preval test case

# complex_complex.md

> Normalize > For > Forof > Complex complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x of $(b)) $(a.x);
`````

## Pre Normal

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
for ($(a).x of $(b)) $(a.x);
`````

## Normalized

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  const tmpCallCallee = $;
  const tmpCalleeParam = a.x;
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output

`````js filename=intro
const a = {};
const b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  const tmpCalleeParam = a.x;
  $(tmpCalleeParam);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
