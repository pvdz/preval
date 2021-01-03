# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x: a } = 1)
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var a;
objAssignPatternRhs = 1;
a = objAssignPatternRhs.x;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var a;
objAssignPatternRhs = 1;
a = objAssignPatternRhs.x;
`````