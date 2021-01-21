# Preval test case

# default_no_no__arr_null.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = [null, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [null, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [null, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'undefined' of null ]>"];

Normalized calls: BAD?!
["<crash[ Cannot read property 'cannotDestructureThis' of null ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'cannotDestructureThis' of null ]>"];

