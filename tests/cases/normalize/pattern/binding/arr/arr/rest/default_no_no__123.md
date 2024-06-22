# Preval test case

# default_no_no__123.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x]] = [[ 100, 200 ]];
$(x);
`````

## Pre Normal


`````js filename=intro
const [[...x]] = [[100, 200]];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [100, 200];
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
const x = [100, 200];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 100, 200 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [100, 200]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
