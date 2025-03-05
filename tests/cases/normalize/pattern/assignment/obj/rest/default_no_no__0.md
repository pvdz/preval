# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ ...x } = 0);
$(x);
`````

## Pre Normal


`````js filename=intro
({ ...x } = 0);
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
x = objPatternRest(0, tmpCalleeParam$1, `x`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
x = objPatternRest( 0, a, "x" );
$( x );
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
