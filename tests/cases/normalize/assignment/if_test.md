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
  let ifTestTmp = (x = objAssignPatternRhs.x);
  if (ifTestTmp) {
    y;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = 1;
let ifTestTmp = (x = objAssignPatternRhs.x);
if (ifTestTmp) {
}
`````
