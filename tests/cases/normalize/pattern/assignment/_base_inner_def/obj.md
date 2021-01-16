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

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````
