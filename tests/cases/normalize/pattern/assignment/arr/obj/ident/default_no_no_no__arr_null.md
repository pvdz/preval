# Preval test case

# default_no_no_no__arr_null.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = [null, 20, 30]);
$('bad');
`````

## Pre Normal

`````js filename=intro
[{ x: x }] = [null, 20, 30];
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [null, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [null, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
