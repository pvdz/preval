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
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForOfLhsNode;
  {
    const tmpForOfRhs = $(b);
    for (tmpForOfLhsNode of tmpForOfRhs) {
      {
        tmpAssignComputedObj = $(a);
        tmpAssignComputedProp = $('foo');
        tmpAssignComputedRhs = tmpForOfLhsNode;
        tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      }
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = {};
let b = { x: 1, y: 2 };
let tmpForOfLhsNode;
const tmpForOfRhs = $(b);
for (tmpForOfLhsNode of tmpForOfRhs) {
  tmpAssignComputedObj = $(a);
  tmpAssignComputedProp = $('foo');
  tmpAssignComputedRhs = tmpForOfLhsNode;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a);
}
`````

## Result

Should call `$` with:
[[{ x: 1, y: 2 }], '<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
