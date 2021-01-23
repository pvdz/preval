# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[[[{}]]]] = [[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpElement$3;
tmpElement$3 = { x: 1 };
tmpElement$2 = [tmpElement$3, 6, 7];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
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
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpElement$3;
tmpElement$3 = { x: 1 };
tmpElement$2 = [tmpElement$3, 6, 7];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
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

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
