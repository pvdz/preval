# Preval test case

# default_no_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = { x: undefined });
$(x);
`````

## Pre Normal


`````js filename=intro
({ x: x } = { x: undefined });
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined };
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Output


`````js filename=intro
x = undefined;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = undefined;
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
