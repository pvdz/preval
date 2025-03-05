# Preval test case

# default_no_no__obj_123.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ ...x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Pre Normal


`````js filename=intro
({ ...x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, b: 2, c: 3 };
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(x);
`````

## Output


`````js filename=intro
const tmpAssignObjPatternRhs /*:object*/ = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
x = objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, `x`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  b: 2,
  c: 3,
};
const b = [];
x = objPatternRest( a, b, "x" );
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
