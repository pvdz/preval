# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > for-a > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for ($(a)[$('x')] = b + c;false;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = $(a);
  tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComputedObj = tmpAssignComMemLhsObj;
  tmpAssignComputedProp = tmpAssignComMemLhsProp;
  tmpAssignComputedRhs = b + c;
  tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
  tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
  while (false) {}
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = 5;
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
while (false) {}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "x"
 - 2: {"x":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], ['x'], [{ x: 5 }, 5, 3], null];

