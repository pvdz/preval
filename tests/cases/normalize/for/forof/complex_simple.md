# Preval test case

# complex_simple.md

> Normalize > For > Forof > Complex simple
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x of b) $(a.x);
`````

## Pre Normal


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
for ($(a).x of b) $(a.x);
`````

## Normalized


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of b) {
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
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of b) {
  const tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  const tmpCalleeParam = a.x;
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = {
  x: 1,
  y: 2,
};
let c = undefined;
for (c of b) {
  const d = $( a );
  d.x = c;
  const e = a.x;
  $( e );
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
