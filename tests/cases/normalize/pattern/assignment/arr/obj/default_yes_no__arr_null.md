# Preval test case

# default_yes_no__arr_null.md

> Normalize > Pattern > Assignment > Arr > Obj > Default yes no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{} = $('fail')] = [null, 20, 30]);
$('bad');
`````

## Pre Normal

`````js filename=intro
[{} = $('fail')] = [null, 20, 30];
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [null, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $('fail');
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
$('bad');
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [null, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $('fail');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
