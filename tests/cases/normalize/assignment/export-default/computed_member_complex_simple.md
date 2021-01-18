# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > export-default > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
export default $(a)[$('x')] = b;
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
export default ((tmpAssignMemLhsObj = $(a)),
(tmpAssignMemRhs = b),
(tmpAssignedComputedObj = tmpAssignMemLhsObj),
(tmpAssignedComputedProp = $('x')),
(tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
export default ((tmpAssignMemLhsObj = $(a)),
(tmpAssignMemRhs = 2),
(tmpAssignedComputedObj = tmpAssignMemLhsObj),
(tmpAssignedComputedProp = $('x')),
(tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs));
$(a, 2, 3);
`````

## Result

Should call `$` with:
["<crash[ Unexpected token 'export' ]>"];

Normalized calls: Same

Final output calls: Same
