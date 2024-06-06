# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [[y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 });
$(y);
`````

## Pre Normal


`````js filename=intro
({
  x: [[y]],
} = { x: [[1, 2, 3], 13], a: 11, b: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
y = arrPatternSplat$1[0];
$(y);
`````

## Output


`````js filename=intro
y = 1;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
y = 1;
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
