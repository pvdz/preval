# Preval test case

# member_complex_simple.md

> normalize > assignment > export-default > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
export default $(a).x = b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
export default ((tmpAssignMemLhsObj = $(a)), (tmpAssignMemRhs = b), (tmpAssignMemLhsObj.x = tmpAssignMemRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
export default ((tmpAssignMemLhsObj = $(a)), (tmpAssignMemRhs = 2), (tmpAssignMemLhsObj.x = tmpAssignMemRhs));
$(a, 2, 3);
`````
