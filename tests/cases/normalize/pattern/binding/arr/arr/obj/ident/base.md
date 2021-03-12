# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Arr > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[{ x }]] = [[{ x: 1 }, 20, 30], 40, 50];
$(x);
`````

## Pre Normal

`````js filename=intro
const [[{ x }]] = [[{ x: 1 }, 20, 30], 40, 50];
$(x);
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
const x = arrPatternStep$1.x;
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement$1 = { x: 1 };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const bindingPatternArrRoot = [tmpArrElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const x = arrPatternStep$1.x;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
