# Preval test case

# base.md

> normalize > pattern > param > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[]] = [[1, 2, 3], 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
tmpElement = [1, 2, 3];
const bindingPatternArrRoot = [tmpElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
tmpElement = [1, 2, 3];
const bindingPatternArrRoot = [tmpElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
[...arrPatternStep];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
