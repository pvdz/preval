# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = 2, x = 3, y = 4;
do { [a, b] = b; } while (x + y);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let b = 2;
let x = 3;
let y = 4;
do {
  arrAssignPatternRhs = b;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  ifTestTmp = x + y;
} while (ifTestTmp);
`````

## Output

`````js filename=intro
var ifTestTmp;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let b = 2;
do {
  arrAssignPatternRhs = b;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  ifTestTmp = 7;
} while (ifTestTmp);
`````
