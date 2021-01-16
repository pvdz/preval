# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? ({ x } = 1) : c;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
{
  if (a) {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
  } else {
    c;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
if (a) {
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
} else {
}
`````
