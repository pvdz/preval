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

## Uniformed

`````js filename=intro
var x;
var x;
{
  if (x) {
    x = 8;
    x = x.x;
  } else {
    x;
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
