# Preval test case

# default_no_no__arr_str.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = ['abc', 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['abc', 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['abc', 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Result

Should call `$` with:
[[{ 0: 'a', 1: 'b', 2: 'c' }], null];

Normalized calls: Same

Final output calls: Same
