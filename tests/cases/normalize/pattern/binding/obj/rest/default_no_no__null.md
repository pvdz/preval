# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Binding > Obj > Rest > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = null;
$('bad');
`````

## Pre Normal

`````js filename=intro
const { ...x } = null;
$(`bad`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = bindingPatternObjRoot;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = `x`;
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(`bad`);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = [];
objPatternRest(null, tmpCalleeParam$1, `x`);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
objPatternRest( null, a, "x" );
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
