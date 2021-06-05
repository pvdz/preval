# Preval test case

# default_no_no_no__arr_123.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = [1, 2, 3, 20, 30]);
$(x);
`````

## Pre Normal

`````js filename=intro
[{ x: x }] = [1, 2, 3, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [1, 2, 3, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
x = (1).x;
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
