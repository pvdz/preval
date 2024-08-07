# Preval test case

# default_no_no_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default no no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y } } = { x: 0, b: 11, c: 12 });
$(y);
`````

## Pre Normal


`````js filename=intro
({
  x: { y: y },
} = { x: 0, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````

## Output


`````js filename=intro
y = (0).y;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
y = 0.y;
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
