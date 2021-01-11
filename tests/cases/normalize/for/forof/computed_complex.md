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
var tmpAssignedComputedProp;
var tmpAssignMemberObj;
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForOfLhsNode;
  {
    const tmpForOfRhs = $(b);
    for (tmpForOfLhsNode of tmpForOfRhs) {
      tmpAssignedComputedProp = $('foo');
      tmpAssignMemberObj = $(a);
      tmpAssignMemberObj[tmpAssignedComputedProp] = tmpForOfLhsNode;
      $(a);
    }
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = {};
var x = { x: 8, x: 8 };
{
  var x;
  {
    var x = x(x);
    for (x of x) {
      x = x('str');
      x = x(x);
      x[x] = x;
      x(x);
    }
  }
}
`````

## Output

`````js filename=intro
var tmpAssignedComputedProp;
var tmpAssignMemberObj;
let a = {};
let b = { x: 1, y: 2 };
let tmpForOfLhsNode;
const tmpForOfRhs = $(b);
for (tmpForOfLhsNode of tmpForOfRhs) {
  tmpAssignedComputedProp = $('foo');
  tmpAssignMemberObj = $(a);
  tmpAssignMemberObj[tmpAssignedComputedProp] = tmpForOfLhsNode;
  $(a);
}
`````
