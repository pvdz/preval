# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
`````
