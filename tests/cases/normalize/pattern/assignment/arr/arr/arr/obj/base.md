# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[[[{}]]]] = [[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50]);
$('ok');
`````

## Normalized

`````js filename=intro
const tmpArrElement$3 = { x: 1 };
const tmpArrElement$2 = [tmpArrElement$3, 6, 7];
const tmpArrElement$1 = [tmpArrElement$2, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const arrAssignPatternRhs = [tmpArrElement, 40, 50];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$2 = [...arrPatternStep$1];
const arrPatternStep$2 = arrPatternSplat$2[0];
const arrPatternSplat$3 = [...arrPatternStep$2];
const arrPatternStep$3 = arrPatternSplat$3[0];
let objPatternCrashTest = arrPatternStep$3 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep$3 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep$3.cannotDestructureThis;
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
