# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [[...y]] }) {
  return y;
}
$(f({ x: [[1, 2, 3], 13], a: 11, b: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [[...y]],
  } = tmpParamBare;
  return y;
};
$(f({ x: [[1, 2, 3], 13], a: 11, b: 12 }, 10));
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
  let arrPatternSplat$1 = [...arrPatternStep];
  let y = arrPatternSplat$1.slice(0);
  return y;
};
const tmpCallCallee = f;
const tmpArrElement = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const y /*:array*/ = [1, 2, 3];
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice