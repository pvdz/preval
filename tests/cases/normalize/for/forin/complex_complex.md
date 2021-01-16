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
for ($(a).x in $(b)) $(a.x);
`````

## Normalized

`````js filename=intro
var tmpAssignMemberObj;
var tmpArg;
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForInLhsNode;
  {
    const tmpForInRhs = $(b);
    for (tmpForInLhsNode in tmpForInRhs) {
      tmpAssignMemberObj = $(a);
      tmpAssignMemberObj.x = tmpForInLhsNode;
      tmpArg = a.x;
      $(tmpArg);
    }
  }
}
`````

## Output

`````js filename=intro
var tmpAssignMemberObj;
var tmpArg;
let a = {};
let b = { x: 1, y: 2 };
let tmpForInLhsNode;
const tmpForInRhs = $(b);
for (tmpForInLhsNode in tmpForInRhs) {
  tmpAssignMemberObj = $(a);
  tmpAssignMemberObj.x = tmpForInLhsNode;
  tmpArg = a.x;
  $(tmpArg);
}
`````
