# Preval test case

# ident_simple.md

> normalize > assignment > computed-prop > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let obj = {};
obj[a = b] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = 1;
let b = 2;
let c = 3;
let obj = {};
tmpAssignedComputedObj = obj;
a = b;
tmpAssignedComputedProp = b;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = 1;
let obj = {};
tmpAssignedComputedObj = obj;
a = 2;
tmpAssignedComputedProp = 2;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, 2, 3);
`````
