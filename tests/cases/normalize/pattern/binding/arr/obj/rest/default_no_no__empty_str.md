# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = '';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'undefined' of undefined ]>

Normalized calls: BAD?!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

