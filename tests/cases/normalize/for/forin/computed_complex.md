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
for ($(a)[$('foo')] in $(b)) $(a);
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
  let tmpForInLhsNode;
  {
    const tmpForInRhs = $(b);
    for (tmpForInLhsNode in tmpForInRhs) {
      tmpAssignMemLhsObj = $(a);
      tmpAssignMemRhs = tmpForInLhsNode;
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
let tmpForInLhsNode;
const tmpForInRhs = $(b);
for (tmpForInLhsNode in tmpForInRhs) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemRhs = tmpForInLhsNode;
  tmpAssignedComputedObj = tmpAssignMemLhsObj;
  tmpAssignedComputedProp = $('foo');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
  $(a);
}
`````

## Result

Should call `$` with:
[[{ x: 1, y: 2 }], null];

Normalized calls: Same

Final output calls: Same
