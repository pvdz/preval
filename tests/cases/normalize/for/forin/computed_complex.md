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
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForInLhsNode;
  {
    const tmpForInRhs = $(b);
    for (tmpForInLhsNode in tmpForInRhs) {
      {
        tmpAssignComputedObj = $(a);
        tmpAssignComputedProp = $('foo');
        tmpAssignComputedRhs = tmpForInLhsNode;
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
let tmpForInLhsNode;
const tmpForInRhs = $(b);
for (tmpForInLhsNode in tmpForInRhs) {
  tmpAssignComputedObj = $(a);
  tmpAssignComputedProp = $('foo');
  tmpAssignComputedRhs = tmpForInLhsNode;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a);
}
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
