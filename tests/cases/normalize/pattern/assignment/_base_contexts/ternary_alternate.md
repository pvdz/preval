# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? b : ({ x } = 1);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
{
  if (a) {
    b;
  } else {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
if (a) {
} else {
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
}
`````
