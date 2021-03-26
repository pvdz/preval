# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Assignment > Arr > Obj > Rest > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x }] = null);
$(x);
`````

## Pre Normal

`````js filename=intro
[{ ...x }] = null;
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = null;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...null];
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
