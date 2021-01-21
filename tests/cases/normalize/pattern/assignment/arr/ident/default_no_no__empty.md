# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > arr > ident > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = 1);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ undefined is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

