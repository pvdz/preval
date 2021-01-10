# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x = b } = 1);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = b;
  } else {
    x = objPatternBeforeDefault;
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = 8;
x = x.x;
{
  var x = x * x;
  if (x) {
    x = x;
  } else {
    x = x;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````
