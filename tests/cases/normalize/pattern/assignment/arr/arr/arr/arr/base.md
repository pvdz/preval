# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Arr > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[[[]]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50]);
$('ok');
`````

## Pre Normal


`````js filename=intro
[[[[]]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50];
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpArrElement$3 = [1, 2, 3];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const arrAssignPatternRhs = [tmpArrElement, 40, 50];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$3 = [...arrPatternStep$1];
const arrPatternStep$3 = arrPatternSplat$3[0];
const arrPatternSplat$5 = [...arrPatternStep$3];
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
