# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = undefined);
$(x);
`````

## Pre Normal


`````js filename=intro
({ ...x } = undefined);
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = undefined;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = `x`;
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = [];
x = objPatternRest(undefined, tmpCalleeParam$1, `x`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
x = objPatternRest( undefined, a, "x" );
$( x );
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
