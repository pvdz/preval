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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
let a = {};
let b = { x: 1, y: 2 };
{
  const tmpForInRhs = $(b);
  {
    let tmpForInLhsNode;
    for (tmpForInLhsNode in tmpForInRhs) {
      tmpAssignMemLhsObj = $(a);
      tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
      tmpAssignComMemLhsProp = $('foo');
      tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForInLhsNode;
      $(a);
    }
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
const tmpForInRhs = $(b);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
  tmpAssignComMemLhsProp = $('foo');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForInLhsNode;
  $(a);
}
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2}
 - 1: {"foo":"y"}
 - 2: "foo"
 - 3: {"foo":"y"}
 - 4: {"foo":"y"}
 - 5: "foo"
 - 6: {"foo":"y"}
 - 7: undefined

Normalized calls: Same

Final output calls: Same
