# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > stmt > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
a[$('x')] *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignedComputedObj = a;
tmpAssignedComputedProp = $('x');
tmpAssignMemLhsObj = tmpAssignedComputedObj;
tmpBinaryLeft = tmpAssignedComputedObj[tmpAssignedComputedProp];
tmpAssignMemRhs = tmpBinaryLeft * b;
tmpAssignMemLhsObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = { x: 10 };
tmpAssignedComputedObj = a;
tmpAssignedComputedProp = $('x');
tmpAssignMemLhsObj = tmpAssignedComputedObj;
tmpBinaryLeft = tmpAssignedComputedObj[tmpAssignedComputedProp];
tmpAssignMemRhs = tmpBinaryLeft * 2;
tmpAssignMemLhsObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['x'], [{ x: 10, undefined: null }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
