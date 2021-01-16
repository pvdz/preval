# Preval test case

# default_yes_no_no__undefined.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')]] = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = undefined;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat_1[0];
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

## Output

`````js filename=intro
const arrPatternSplat = [...undefined];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat_1[0];
let x;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````
