# Preval test case

# default_no_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Arr > Default no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = { x: 0, a: 11, b: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
[...objPatternNoDefault];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
