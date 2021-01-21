# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > arr > ident > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
arrPatternSplat[0];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
