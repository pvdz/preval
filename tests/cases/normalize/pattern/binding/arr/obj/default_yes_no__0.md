# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Binding > Arr > Obj > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{} = $('fail')] = 0;
$('bad');
`````

## Pre Normal


`````js filename=intro
const [{} = $(`fail`)] = 0;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = 0;
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
$(`bad`);
`````

## Output


`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ...0 ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
