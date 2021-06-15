# Preval test case

# default_no_no__arr_null.md

> Normalize > Pattern > Assignment > Arr > Arr > Default no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[]] = [null, 4, 5]);
$('bad');
`````

## Pre Normal

`````js filename=intro
[[]] = [null, 4, 5];
$(`bad`);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [null, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$(`bad`);
`````

## Output

`````js filename=intro
[...null];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
