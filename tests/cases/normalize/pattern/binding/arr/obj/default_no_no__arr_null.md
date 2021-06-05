# Preval test case

# default_no_no__arr_null.md

> Normalize > Pattern > Binding > Arr > Obj > Default no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{}] = [null, 20, 30];
$('ok');
`````

## Pre Normal

`````js filename=intro
const [{}] = [null, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [null, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
} else {
}
$('ok');
`````

## Output

`````js filename=intro
null.cannotDestructureThis;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
