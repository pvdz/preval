# Preval test case

# default_no_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = { x: 0, b: 11, c: 12 });
$(y);
`````

## Pre Normal

`````js filename=intro
({
  x: { ...y },
} = { x: 0, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(y);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCalleeParam$1 = [];
y = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
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
