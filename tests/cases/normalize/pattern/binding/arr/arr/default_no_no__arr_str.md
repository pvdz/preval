# Preval test case

# default_no_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Arr > Default no no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[]] = ['abc', 4, 5];
$('ok');
`````

## Pre Normal

`````js filename=intro
const [[]] = ['abc', 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['abc', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['abc', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
[...arrPatternStep];
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
