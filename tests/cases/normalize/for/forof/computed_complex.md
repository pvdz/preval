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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForOfLhsNode;
  {
    const tmpForOfRhs = $(b);
    for (tmpForOfLhsNode of tmpForOfRhs) {
      tmpAssignMemLhsObj = $(a);
      tmpAssignMemRhs = tmpForOfLhsNode;
      tmpAssignedComputedObj = tmpAssignMemLhsObj;
      tmpAssignedComputedProp = $('foo');
      tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = {};
let b = { x: 1, y: 2 };
let tmpForOfLhsNode;
const tmpForOfRhs = $(b);
for (tmpForOfLhsNode of tmpForOfRhs) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignedComputedObj = tmpAssignMemLhsObj;
  tmpAssignedComputedProp = $('foo');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
  $(a);
}
`````
