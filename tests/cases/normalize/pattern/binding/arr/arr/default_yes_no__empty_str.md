# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern > param >  > arr > arr > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['pass2'])] = '';
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = '';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['pass2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
const arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
var tmpArg;
const arrPatternSplat = [...''];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['pass2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
[...arrPatternStep];
$('ok');
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
