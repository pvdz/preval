# Preval test case

# default_no_no__123.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[...x]] = [[ ]]);
$(x);
`````

## Pre Normal


`````js filename=intro
[[...x]] = [[]];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
x = [];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = [];
$( x );
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
