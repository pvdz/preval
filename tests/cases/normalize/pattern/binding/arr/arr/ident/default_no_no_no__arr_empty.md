# Preval test case

# default_no_no_no__arr_empty.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default no no no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x]] = [];
$('bad');
`````

## Pre Normal

`````js filename=intro
const [[x]] = [];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
arrPatternSplat$1[0];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
