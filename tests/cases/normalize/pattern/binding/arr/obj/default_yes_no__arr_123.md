# Preval test case

# default_yes_no__arr_123.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = [1, 2, 3, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
{
  let arrPatternStep;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      arrPatternStep = $('fail');
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
}
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  arrPatternStep = $('fail');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
$('ok');
`````
