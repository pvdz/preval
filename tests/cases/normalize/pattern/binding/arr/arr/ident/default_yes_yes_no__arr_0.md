# Preval test case

# default_yes_yes_no__arr_0.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')] = $(['fail2'])] = [0, 4, 5];
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [0, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
let x;
{
  let ifTestTmp_1 = arrPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault_1;
  }
}
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [0, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
let x;
let ifTestTmp_1 = arrPatternBeforeDefault_1 === undefined;
if (ifTestTmp_1) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault_1;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
