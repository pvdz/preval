# Preval test case

# default_no_no_no__arr_obj_null.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  arr obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x }] = [{ x: null, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Pre Normal


`````js filename=intro
[{ x: x }] = [{ x: null, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: null, y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$(x);
`````

## Output


`````js filename=intro
x = null;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = null;
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