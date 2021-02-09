# Preval test case

# default_no_no__obj_123.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = { x: 1, a: 2, b: 3 });
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, a: 2, b: 3 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, a: 2, b: 3 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
[...objPatternNoDefault];
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
