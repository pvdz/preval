# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: { ...z },
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 });
$(z);
`````

## Pre Normal


`````js filename=intro
({
  x: {
    y: { ...z },
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 });
$(z);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault$1;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
z = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(z);
`````

## Output


`````js filename=intro
const tmpObjLitVal$3 = { z: 1, a: 2, b: 3 };
const tmpCalleeParam$1 = [];
z = objPatternRest(tmpObjLitVal$3, tmpCalleeParam$1, undefined);
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
z: 1,
a: 2,
b: 3
;
const b = [];
z = objPatternRest( a, b, undefined );
$( z );
`````

## Globals

BAD@! Found 1 implicit global bindings:

z

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
