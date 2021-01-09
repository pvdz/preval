# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > arr > ident > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('fail')] = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = undefined;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
{
  let x;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('fail');
    } else {
      x = arrPatternBeforeDefault;
    }
  }
}
$('bad');
`````

## Uniformed

`````js filename=intro
var x = x;
var x = [...x];
var x = x[8];
{
  var x;
  {
    var x = x * x;
    if (x) {
      x = x('str');
    } else {
      x = x;
    }
  }
}
x('str');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...undefined];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````
