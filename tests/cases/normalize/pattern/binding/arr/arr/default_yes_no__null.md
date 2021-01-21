# Preval test case

# default_yes_no__null.md

> normalize > pattern > param >  > arr > arr > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['fail2'])] = null;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = null;
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
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const arrPatternSplat = [...null];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
[...arrPatternStep];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
