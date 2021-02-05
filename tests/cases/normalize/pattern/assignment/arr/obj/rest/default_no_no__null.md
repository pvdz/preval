# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x }] = null);
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
const tmpCalleeParam$2 = undefined;
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...null];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
