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
for ($(a).x of b) $(a.x);
`````

## Normalized

`````js filename=intro
var tmpAssignMemberObj;
var tmpArg;
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of b) {
    tmpAssignMemberObj = $(a);
    tmpAssignMemberObj.x = tmpForOfLhsNode;
    tmpArg = a.x;
    $(tmpArg);
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
  for (x of x) {
    x = x(x);
    x.x = x;
    x = x.x;
    x(x);
  }
}
`````

## Output

`````js filename=intro
var tmpAssignMemberObj;
var tmpArg;
let a = {};
let b = { x: 1, y: 2 };
let tmpForOfLhsNode;
for (tmpForOfLhsNode of b) {
  tmpAssignMemberObj = $(a);
  tmpAssignMemberObj.x = tmpForOfLhsNode;
  tmpArg = a.x;
  $(tmpArg);
}
`````
