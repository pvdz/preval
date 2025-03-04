# Preval test case

# default_no_no_no__arr_obj_empty.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x }] = [{}, 20, 30]);
$(x);
`````

## Pre Normal


`````js filename=intro
[{ x: x }] = [{}, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = {};
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$(x);
`````

## Output


`````js filename=intro
x = $Object_prototype.x;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = $Object_prototype.x;
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
