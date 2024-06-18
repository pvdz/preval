# Preval test case

# default_yes_no__arr_empty.md

> Normalize > Pattern > Binding > Arr > Obj > Default yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{} = $('pass')] = [];
$('ok');
`````

## Pre Normal


`````js filename=intro
const [{} = $(`pass`)] = [];
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`pass`);
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
const tmpClusterSSA_arrPatternStep = $(`pass`);
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
const a = $( "pass" );
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
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
