# Preval test case

# default_no_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Arr > Default no no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[]] = []);
$('bad');
`````

## Pre Normal

`````js filename=intro
[[]] = [];
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$('bad');
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
[...arrPatternStep];
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
