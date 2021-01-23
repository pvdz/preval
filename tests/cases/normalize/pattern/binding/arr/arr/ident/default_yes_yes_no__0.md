# Preval test case

# default_yes_yes_no__0.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')] = $(['fail2'])] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = 0;
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
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x;
{
  let ifTestTmp$1 = arrPatternBeforeDefault$1 === undefined;
  if (ifTestTmp$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault$1;
  }
}
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const arrPatternSplat = [...0];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x;
let ifTestTmp$1 = arrPatternBeforeDefault$1 === undefined;
if (ifTestTmp$1) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault$1;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
