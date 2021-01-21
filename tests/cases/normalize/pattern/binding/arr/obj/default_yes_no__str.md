# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > arr > obj > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('pass')] = 'abc';
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  arrPatternStep = $('pass');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
