# Preval test case

# computed_complex.md

> Normalize > For > Forof > Computed complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a)[$('foo')] of $(b)) $(a);
`````

## Pre Normal


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
for ($(a)[$(`foo`)] of $(b)) $(a);
`````

## Normalized


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpAssignComMemLhsObj = $(a);
  const tmpAssignComMemLhsProp = $(`foo`);
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForOfLhsNode;
  $(a);
}
`````

## Output


`````js filename=intro
const a = {};
const b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpAssignComMemLhsObj = $(a);
  const tmpAssignComMemLhsProp = $(`foo`);
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForOfLhsNode;
  $(a);
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
const c = $( b );
let d = undefined;
for (d of c) {
  const e = $( a );
  const f = $( "foo" );
  e[f] = d;
  $( a );
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
