# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[[...x]]] = [[[1, 2, 3], 20, 30], 40, 50]);
$(x);
`````

## Pre Normal


`````js filename=intro
[[[...x]]] = [[[1, 2, 3], 20, 30], 40, 50];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement$1 = [1, 2, 3];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const arrAssignPatternRhs = [tmpArrElement, 40, 50];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$3 = [...arrPatternStep$1];
x = arrPatternSplat$3.slice(0);
$(x);
`````

## Output


`````js filename=intro
x = [1, 2, 3];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = [ 1, 2, 3 ];
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice