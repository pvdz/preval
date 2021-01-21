# Preval test case

# default_no_no_no__arr_undefined.md

> normalize > pattern >  > param > arr > arr > ident > default_no_no_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x]] = [undefined, 4, 5];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [undefined, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1[0];
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [undefined, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
arrPatternSplat_1[0];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
