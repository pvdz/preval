# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = null);
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: { ...y },
} = null);
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = null;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(`bad`);
`````

## Output

`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
