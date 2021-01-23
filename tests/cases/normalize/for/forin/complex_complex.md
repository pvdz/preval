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
var tmpArg;
var tmpAssignMemLhsObj;
let a = {};
let b = { x: 1, y: 2 };
{
  const tmpForInRhs = $(b);
  {
    let tmpForInLhsNode;
    for (tmpForInLhsNode in tmpForInRhs) {
      tmpAssignMemLhsObj = $(a);
      tmpAssignMemLhsObj.x = tmpForInLhsNode;
      tmpArg = a.x;
      $(tmpArg);
    }
  }
}
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
let a = {};
let b = { x: 1, y: 2 };
const tmpForInRhs = $(b);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
  tmpArg = a.x;
  $(tmpArg);
}
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2}
 - 1: {"x":"y"}
 - 2: "x"
 - 3: {"x":"y"}
 - 4: "y"
 - 5: undefined

Normalized calls: Same

Final output calls: Same
