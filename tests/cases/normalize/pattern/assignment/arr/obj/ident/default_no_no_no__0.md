# Preval test case

# default_no_no_no__0.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = 0);
$('bad');
`````

## Pre Normal

`````js filename=intro
[{ x: x }] = 0;
$(`bad`);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 0;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$(`bad`);
`````

## Output

`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
