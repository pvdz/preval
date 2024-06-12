# Preval test case

# default_yes_no__arr_undefined.md

> Normalize > Pattern > Binding > Arr > Obj > Default yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = [undefined, 20, 30];
$('ok');
`````

## Pre Normal


`````js filename=intro
const [{} = $(`fail`)] = [undefined, 20, 30];
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [undefined, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
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
const tmpClusterSSA_arrPatternStep = $(`fail`);
let objPatternCrashTest = tmpClusterSSA_arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = tmpClusterSSA_arrPatternStep === null;
}
if (objPatternCrashTest) {
  tmpClusterSSA_arrPatternStep.cannotDestructureThis;
} else {
}
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "fail" );
let b = a === undefined;
if (b) {

}
else {
  b = a === null;
}
if (b) {
  a.cannotDestructureThis;
}
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fail'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
