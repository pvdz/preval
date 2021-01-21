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
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
tmpElement_3 = { x: 1 };
tmpElement_2 = [tmpElement_3, 6, 7];
tmpElement_1 = [tmpElement_2, 4, 5];
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const arrPatternSplat_2 = [...arrPatternStep_1];
const arrPatternStep_2 = arrPatternSplat_2[0];
const arrPatternSplat_3 = [...arrPatternStep_2];
const arrPatternStep_3 = arrPatternSplat_3[0];
let objPatternCrashTest = arrPatternStep_3 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep_3 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep_3.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
tmpElement_3 = { x: 1 };
tmpElement_2 = [tmpElement_3, 6, 7];
tmpElement_1 = [tmpElement_2, 4, 5];
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const arrPatternSplat_2 = [...arrPatternStep_1];
const arrPatternStep_2 = arrPatternSplat_2[0];
const arrPatternSplat_3 = [...arrPatternStep_2];
const arrPatternStep_3 = arrPatternSplat_3[0];
let objPatternCrashTest = arrPatternStep_3 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep_3 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep_3.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
