# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = undefined);
$('bad');
`````

## Pre Normal

`````js filename=intro
({ x: x } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = undefined;
x = tmpAssignObjPatternRhs.x;
$('bad');
`````

## Output

`````js filename=intro
x = undefined.x;
$('bad');
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
