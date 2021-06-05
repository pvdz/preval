# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([...x] = [1, 2, 3]);
$(x);
`````

## Pre Normal

`````js filename=intro
[...x] = [1, 2, 3];
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [1, 2, 3];
x = arrPatternSplat.slice(0);
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
