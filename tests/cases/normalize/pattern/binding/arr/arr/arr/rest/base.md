# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[[...x]]] = [[[1, 2, 3], 20, 30], 40, 50];
$(x);
`````

## Pre Normal

`````js filename=intro
const [[[...x]]] = [[[1, 2, 3], 20, 30], 40, 50];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement$1 = [1, 2, 3];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const bindingPatternArrRoot = [tmpArrElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$3 = [...arrPatternStep$1];
const x = arrPatternSplat$3.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat$3 = [1, 2, 3];
const x = arrPatternSplat$3.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3,, ];
const b = a.slice( 0 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
