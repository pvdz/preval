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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
let a = {};
let b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    tmpAssignMemLhsObj = $(a);
    tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
    tmpAssignComMemLhsProp = $('foo');
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForOfLhsNode;
    $(a);
  }
}
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
let a = {};
let b = { x: 1, y: 2 };
const tmpForOfRhs = $(b);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
  tmpAssignComMemLhsProp = $('foo');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForOfLhsNode;
  $(a);
}
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2}
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
