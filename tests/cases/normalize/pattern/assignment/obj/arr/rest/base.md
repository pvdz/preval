# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [...y] } = { x: [1, 2, 3], a: 11, b: 12 });
$(y);
`````

## Pre Normal

`````js filename=intro
({
  x: [...y],
} = { x: [1, 2, 3], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
const arrPatternSplat = [1, 2, 3];
y = arrPatternSplat.slice(0);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
y = a.slice( 0 );
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
