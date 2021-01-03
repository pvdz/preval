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
tmpArg = x = objAssignPatternRhs.x;
f(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var x;
objAssignPatternRhs = 1;
tmpArg = x = objAssignPatternRhs.x;
f(tmpArg);
`````
