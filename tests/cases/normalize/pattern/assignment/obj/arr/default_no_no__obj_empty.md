# Preval test case

# default_no_no__obj_empty.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = {});
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = {};
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = {};
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
