# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > arr > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
$('bad');
`````

## Result

Should call `$` with:
['<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
