# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
if (({ x } = 1)) y;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = 1;
if ((x = objAssignPatternRhs.x)) {
  y;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = 1;
if ((x = objAssignPatternRhs.x)) {
}
`````
