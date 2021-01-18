# Preval test case

# default_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = [, , , 1, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [, , , 1, 20, 30];
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
const bindingPatternArrRoot = [, , , 1, 20, 30];
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

## Result

Should call `$` with:
[['fail'], "<crash[ Cannot destructure '$(...)' as it is undefined. ]>"];

Normalized calls: BAD?!
[['fail'], ['ok'], null];

Final output calls: BAD!!
[['fail'], ['ok'], null];

