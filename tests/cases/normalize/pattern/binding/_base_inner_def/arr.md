# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [ x = a ] = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
{
  let x;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = a;
    } else {
      x = arrPatternBeforeDefault;
    }
  }
}
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = [...x];
var x = x[8];
{
  var x;
  {
    var x = x * x;
    if (x) {
      x = x;
    } else {
      x = x;
    }
  }
}
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
`````
