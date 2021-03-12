# Preval test case

# default_no__0.md

> Normalize > Pattern > Assignment > Arr > Default no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = 0);
$('bad');
`````

## Pre Normal

`````js filename=intro
[] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 0;
const arrPatternSplat = [...arrAssignPatternRhs];
$('bad');
`````

## Output

`````js filename=intro
[...0];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
