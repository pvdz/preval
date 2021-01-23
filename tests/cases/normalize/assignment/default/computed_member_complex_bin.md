# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > default > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { default: $(a)[$('x')] = b + c; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpAssignMemLhsObj = $(a);
      tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
      tmpAssignComMemLhsProp = $('x');
      tmpAssignComputedObj = tmpAssignComMemLhsObj;
      tmpAssignComputedProp = tmpAssignComMemLhsProp;
      tmpAssignComputedRhs = b + c;
      tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
      tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
$('a');
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = 5;
tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"x":5}
 - 2: "x"
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], [{ x: 5 }], ['x'], [{ x: 5 }, 5, 3], null];

