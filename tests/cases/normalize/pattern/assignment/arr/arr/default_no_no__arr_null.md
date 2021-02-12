# Preval test case

# default_no_no__arr_null.md

> normalize > pattern > param > arr > arr > default_no_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[]] = [null, 4, 5]);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpArrElement = null;
const arrAssignPatternRhs = [tmpArrElement, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$('bad');
`````

## Output

`````js filename=intro
const tmpArrElement = null;
const arrAssignPatternRhs = [tmpArrElement, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
