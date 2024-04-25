# Preval test case

# default_no_no_no__obj_missing.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default no no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = { a: 11, b: 12 });
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: [y],
} = { a: 11, b: 12 });
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternNoDefault = $ObjectPrototype.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
const b = [ ... a ];
y = b[ 0 ];
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
