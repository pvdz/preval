# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } } = '';
$('bad');
`````

## Pre Normal


`````js filename=intro
const {
  x: { ...y },
} = ``;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = ``;
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
const objPatternNoDefault /*:unknown*/ = ``.x;
const tmpCalleeParam$1 /*:array*/ = [];
objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "".x;
const b = [];
objPatternRest( a, b, undefined );
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
