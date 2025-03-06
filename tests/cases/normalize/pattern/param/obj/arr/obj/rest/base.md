# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [{ ...y }] }) {
  return y;
}
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [{ ...y }],
  } = tmpParamBare;
  return y;
};
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  let y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return y;
};
const tmpCallCallee = f;
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$5 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpArrElement /*:object*/ = { x: 1, y: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
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
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope