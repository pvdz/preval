# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Pre Normal

`````js filename=intro
({
  x: { y: y },
} = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````

## Output

`````js filename=intro
y = 2;
$(y);
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
