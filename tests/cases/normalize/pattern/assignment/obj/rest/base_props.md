# Preval test case

# base.md

> normalize > pattern >  > param > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ a, b, ...x } = { x: 1, a: 2, b: 3, c: 4 });
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var a;
var b;
var x;
objAssignPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = objAssignPatternRhs.a;
b = objAssignPatternRhs.b;
tmpArg = ['a', 'b'];
x = objPatternRest(objAssignPatternRhs, tmpArg);
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var a;
var b;
var x;
objAssignPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = objAssignPatternRhs.a;
b = objAssignPatternRhs.b;
tmpArg = ['a', 'b'];
x = objPatternRest(objAssignPatternRhs, tmpArg);
$(x);
`````
