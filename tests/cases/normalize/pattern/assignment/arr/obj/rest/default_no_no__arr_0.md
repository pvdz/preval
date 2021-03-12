# Preval test case

# default_no_no__arr_0.md

> Normalize > Pattern > Assignment > Arr > Obj > Rest > Default no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x }] = [0, 20, 30]);
$(x);
`````

## Pre Normal

`````js filename=intro
[{ ...x }] = [0, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [0, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [0, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam$1 = [];
x = objPatternRest(arrPatternStep, tmpCalleeParam$1, undefined);
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
