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
var tmpAssignedComputedProp;
x = {};
a = 1;
b = 2;
c = 3;
tmpAssignedComputedProp = a + b;
x[tmpAssignedComputedProp] = c;
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x = {};
var x = 8;
var x = 8;
var x = 8;
x = x * x;
x[x] = x;
`````

## Output

`````js filename=intro
var x;
var a;
var b;
var c;
var tmpAssignedComputedProp;
x = {};
a = 1;
b = 2;
c = 3;
tmpAssignedComputedProp = a + b;
x[tmpAssignedComputedProp] = c;
`````
