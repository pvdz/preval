# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = 0);
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: { ...y },
} = 0);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = (0).x;
const tmpCalleeParam$1 = [];
y = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$('bad');
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
