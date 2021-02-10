# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[{}]] = [[{ x: 1 }, 20, 30], 40, 50];
$('ok');
`````

## Normalized

`````js filename=intro
const tmpArrElement$1 = { x: 1 };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const bindingPatternArrRoot = [tmpArrElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
let objPatternCrashTest = arrPatternStep$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep$1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
