# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x } = 1);
$('bad');
`````

## Pre Normal


`````js filename=intro
({ x: x } = 1);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
x = tmpAssignObjPatternRhs.x;
$(`bad`);
`````

## Output


`````js filename=intro
x = (1).x;
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
x = 1.x;
$( "bad" );
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
