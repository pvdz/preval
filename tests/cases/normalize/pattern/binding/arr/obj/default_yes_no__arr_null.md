# Preval test case

# default_yes_no__arr_null.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = [null, 20, 30];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [null, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    arrPatternStep = $('fail');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [null, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  arrPatternStep = $('fail');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot destructure '$(...)' as it is null. ]>"];

Normalized calls: BAD?!
[['bad'], null];

Final output calls: BAD!!
[['bad'], null];

