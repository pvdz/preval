# Preval test case

# default_no_no__obj_null.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = { x: null, a: 11, b: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = null;
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
tmpAssignObjPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: null, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
[...objPatternNoDefault];
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
