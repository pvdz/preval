# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[]] = [[1, 2, 3], 4, 5];
$('ok');
`````

## Pre Normal

`````js filename=intro
const [[]] = [[1, 2, 3], 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
const tmpArrElement = [1, 2, 3];
const bindingPatternArrRoot = [tmpArrElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
$('ok');
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
