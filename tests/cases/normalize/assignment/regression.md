# Preval test case

# regression.md

> normalize > assignment > regression
>
> This case was being transformed incorrectly, with a sequence ending up as the lhs of an assignment (which is invalid).

#TODO

## Input

`````js filename=intro
var x = {}, a = 1, b = 2, c = 3;
x[a + b] = c;
`````

## Normalized

`````js filename=intro
var x;
var a;
var b;
var c;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
x = {};
a = 1;
b = 2;
c = 3;
tmpAssignedComputedObj = x;
tmpAssignedComputedProp = a + b;
tmpAssignedComputedObj[tmpAssignedComputedProp] = c;
`````

## Output

`````js filename=intro
var x;
var a;
var b;
var c;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
x = {};
a = 1;
b = 2;
c = 3;
tmpAssignedComputedObj = x;
tmpAssignedComputedProp = a + b;
tmpAssignedComputedObj[tmpAssignedComputedProp] = c;
`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
