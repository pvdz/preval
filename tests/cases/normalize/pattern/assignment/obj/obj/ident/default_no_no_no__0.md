# Preval test case

# default_no_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default no no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y } } = 0);
$('bad');
`````

## Pre Normal


`````js filename=intro
({
  x: { y: y },
} = 0);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
y = objPatternNoDefault.y;
$(`bad`);
`````

## Output


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
y = objPatternNoDefault.y;
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.x;
y = a.y;
$( "bad" );
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
