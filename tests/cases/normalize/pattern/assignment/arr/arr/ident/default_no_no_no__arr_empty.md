# Preval test case

# default_no_no_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Default no no no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x]] = []);
$('bad');
`````

## Pre Normal

`````js filename=intro
[[x]] = [];
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1[0];
$('bad');
`````

## Output

`````js filename=intro
[...undefined];
throw '[Preval]: Array spread must crash before this line';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
