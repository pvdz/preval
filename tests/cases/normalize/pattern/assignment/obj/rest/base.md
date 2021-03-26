# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Pre Normal

`````js filename=intro
({ ...x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, b: 2, c: 3 };
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = 'x';
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(x);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$1 = [];
x = objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, 'x');
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
