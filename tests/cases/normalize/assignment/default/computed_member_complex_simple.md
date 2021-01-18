# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > default > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { default: $(a)[$('x')] = b; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
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
      tmpAssignMemRhs = b;
      tmpAssignedComputedObj = tmpAssignMemLhsObj;
      tmpAssignedComputedProp = $('x');
      tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
$('a');
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 2;
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['a'], [{ x: 10 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
