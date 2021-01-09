# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
f({ x } = 1);
`````

## Normalized

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var x;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
tmpArg = x;
f(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = 8;
x = x.x;
x = x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var x;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
tmpArg = x;
f(tmpArg);
`````
