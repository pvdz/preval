# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > for-let > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let wat = $(a)[$('x')] = b; false;);
$(wat);
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
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemRhs = b;
  tmpAssignedComputedObj = tmpAssignMemLhsObj;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
  let wat_1 = b;
  while (false) {}
}
$(wat_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 2;
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
while (false) {}
$(2);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
