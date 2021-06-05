# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = { x: [1, 2, 3], a: 11, b: 12 });
$('ok');
`````

## Pre Normal

`````js filename=intro
({
  x: [],
} = { x: [1, 2, 3], a: 11, b: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$('ok');
`````

## Output

`````js filename=intro
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
