# Preval test case

# default_no_no__obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = { b: 11, c: 12 });
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: { ...y },
} = { b: 11, c: 12 });
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { b: 11, c: 12 };
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
const tmpObjectPrototype = Object.prototype;
const objPatternNoDefault = tmpObjectPrototype.x;
const tmpCalleeParam$1 = [];
y = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
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
