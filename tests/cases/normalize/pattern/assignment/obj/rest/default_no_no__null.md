# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ ...x } = null);
$('bad');
`````

## Pre Normal


`````js filename=intro
({ ...x } = null);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = null;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(`bad`);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
x = objPatternRest(null, tmpCalleeParam$1, `x`);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
x = objPatternRest( null, a, "x" );
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
