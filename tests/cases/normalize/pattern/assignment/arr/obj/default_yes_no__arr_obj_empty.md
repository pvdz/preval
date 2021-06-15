# Preval test case

# default_yes_no__arr_obj_empty.md

> Normalize > Pattern > Assignment > Arr > Obj > Default yes no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{} = $('fail')] = [{}, 20, 30]);
$('ok');
`````

## Pre Normal

`````js filename=intro
[{} = $(`fail`)] = [{}, 20, 30];
$(`ok`);
`````

## Normalized

`````js filename=intro
const tmpArrElement = {};
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`fail`);
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
} else {
}
$(`ok`);
`````

## Output

`````js filename=intro
$(`ok`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
