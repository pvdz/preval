# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: [[]],
  },
] = [{ x: [[1, 2, 3], 10], y: 11 }, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
const tmpArrElement$1 = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement$1, 10];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$2 = [...arrPatternStep$1];
$('ok');
`````

## Output

`````js filename=intro
const tmpArrElement$1 = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement$1, 10];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
const arrPatternStep$1 = arrPatternSplat$1[0];
[...arrPatternStep$1];
$('ok');
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
