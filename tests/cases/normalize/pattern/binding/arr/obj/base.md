# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{}] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
$('ok');
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
