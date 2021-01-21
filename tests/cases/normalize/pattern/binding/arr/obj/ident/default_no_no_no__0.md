# Preval test case

# default_no_no_no__0.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 0;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
const arrPatternStep = arrPatternSplat[0];
arrPatternStep.x;
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
