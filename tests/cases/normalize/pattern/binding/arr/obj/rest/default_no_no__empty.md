# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = [{}];
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ ...x }] = [{}];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = {};
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement = {};
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam$1 = [];
const x = objPatternRest(arrPatternStep, tmpCalleeParam$1, undefined);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
