# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[x]] = [[1, 2, 3], 4, 5];
$(x);
`````

## Pre Normal


`````js filename=intro
const [[x]] = [[1, 2, 3], 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [1, 2, 3];
const bindingPatternArrRoot = [tmpArrElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$(x);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope