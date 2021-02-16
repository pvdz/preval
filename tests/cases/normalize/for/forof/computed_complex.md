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
for ($(a)[$('foo')] of $(b)) $(a);
`````

## Normalized

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpAssignComMemLhsObj = $(a);
  const tmpAssignComMemLhsProp = $('foo');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForOfLhsNode;
  $(a);
}
`````

## Output

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpAssignComMemLhsObj = $(a);
  const tmpAssignComMemLhsProp = $('foo');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForOfLhsNode;
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
