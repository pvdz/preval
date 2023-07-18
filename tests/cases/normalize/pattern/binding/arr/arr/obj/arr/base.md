# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Arr > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  [
    {
      x: [],
    },
  ],
] = [[{ x: [1, 2, 3] }, 20, 30], 40, 50];
$('ok');
`````

## Pre Normal

`````js filename=intro
const [
  [
    {
      x: [],
    },
  ],
] = [[{ x: [1, 2, 3] }, 20, 30], 40, 50];
$(`ok`);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement$1 = { x: tmpObjLitVal };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const bindingPatternArrRoot = [tmpArrElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const objPatternNoDefault = arrPatternStep$1.x;
const arrPatternSplat$3 = [...objPatternNoDefault];
$(`ok`);
`````

## Output

`````js filename=intro
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
