# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````

## Result

Should call `$` with:
 - 1: { 0: '"a"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
