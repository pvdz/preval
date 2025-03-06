# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [{ ...y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 });
$(y);
`````

## Pre Normal


`````js filename=intro
({
  x: [{ ...y }],
} = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````

## Output


`````js filename=intro
const tmpArrElement /*:object*/ = { x: 1, y: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
y = objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  c: 3,
};
const b = [];
y = objPatternRest( a, b, undefined );
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope