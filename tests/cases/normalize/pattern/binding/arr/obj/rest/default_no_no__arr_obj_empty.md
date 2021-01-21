# Preval test case

# default_no_no__arr_obj_empty.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__arr_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = [{}, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [{}, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [{}, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Result

Should call `$` with:
 - 0: {}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
