# Preval test case

# member_simple_simple.md

> normalize > assignment > computed-prop > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let obj = {};
obj[a.x = b] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedPropAssignRhs = b;
a.x = tmpNestedPropAssignRhs;
tmpAssignedComputedProp = tmpNestedPropAssignRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedPropAssignRhs = 2;
a.x = tmpNestedPropAssignRhs;
tmpAssignedComputedProp = tmpNestedPropAssignRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
