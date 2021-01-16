# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([ x = a ] = 1);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = a;
  } else {
    x = arrPatternBeforeDefault;
  }
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
`````
