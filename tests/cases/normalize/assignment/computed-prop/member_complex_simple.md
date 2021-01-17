# Preval test case

# member_complex_simple.md

> normalize > assignment > computed-prop > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let obj = {};
obj[$(a).x = b] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedAssignObj;
let a = { x: 10 };
let b = 2;
let c = 3;
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = b;
tmpAssignedComputedProp = b;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedAssignObj;
let a = { x: 10 };
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = 2;
tmpAssignedComputedProp = 2;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, 2, 3);
`````
