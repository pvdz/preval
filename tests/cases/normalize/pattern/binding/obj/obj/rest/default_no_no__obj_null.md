# Preval test case

# default_no_no__obj_null.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = { x: null, b: 11, c: 12 };
$('bad');
`````

## Pre Normal

`````js filename=intro
const {
  x: { ...y },
} = { x: null, b: 11, c: 12 };
$(`bad`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: null, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
const y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(`bad`);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = [];
objPatternRest(null, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
objPatternRest( null, a, undefined );
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
