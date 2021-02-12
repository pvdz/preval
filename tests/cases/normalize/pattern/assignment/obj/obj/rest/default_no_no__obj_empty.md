# Preval test case

# default_no_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = {});
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = {};
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$('bad');
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = {};
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
