# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x } = null);
$('bad');
`````

## Pre Normal


`````js filename=intro
({ x: x } = null);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = null;
x = tmpAssignObjPatternRhs.x;
$(`bad`);
`````

## Output


`````js filename=intro
x = null.x;
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
x = null.x;
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
