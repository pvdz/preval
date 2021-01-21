# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[[]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
var tmpElement_2;
tmpElement_2 = [1, 2, 3];
tmpElement_1 = [tmpElement_2, 4, 5];
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const arrPatternSplat_2 = [...arrPatternStep_1];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
var tmpElement_2;
tmpElement_2 = [1, 2, 3];
tmpElement_1 = [tmpElement_2, 4, 5];
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
[...arrPatternStep_1];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
