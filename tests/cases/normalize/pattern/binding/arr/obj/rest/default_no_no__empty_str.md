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
const x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'undefined' of undefined ]>"];

Normalized calls: BAD?!
[[{}], null];

Final output calls: BAD!!
[[{}], null];

