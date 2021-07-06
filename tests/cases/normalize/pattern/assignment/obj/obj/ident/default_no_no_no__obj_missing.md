# Preval test case

# default_no_no_no__obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default no no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = { b: 11, c: 12 });
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: { y: y },
} = { b: 11, c: 12 });
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
y = objPatternNoDefault.y;
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternNoDefault = $ObjectPrototype.x;
y = objPatternNoDefault.y;
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
