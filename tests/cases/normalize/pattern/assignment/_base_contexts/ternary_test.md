# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1) ? b : c;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
{
  {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
    let ifTestTmp = 1;
    if (ifTestTmp) {
      b;
    } else {
      c;
    }
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
{
  {
    x = 8;
    x = x.x;
    var x = 8;
    if (x) {
      x;
    } else {
      x;
    }
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
`````
