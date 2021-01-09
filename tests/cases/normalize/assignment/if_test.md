# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
if (({ x } = 1)) y;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
let y;
{
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
  let ifTestTmp = 1;
  if (ifTestTmp) {
    y;
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
{
  x = 8;
  x = x.x;
  var x = 8;
  if (x) {
    x;
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
