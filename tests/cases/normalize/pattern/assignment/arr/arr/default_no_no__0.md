# Preval test case

# default_no_no__0.md

> normalize > pattern > param > arr > arr > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[]] = 0);
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 0;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
const arrPatternStep = arrPatternSplat[0];
[...arrPatternStep];
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
