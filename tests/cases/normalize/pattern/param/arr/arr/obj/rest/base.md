# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[{ ...x }]]) {
  return x;
}
$(f([[{ x: 1, y: 2, z: 3 }, 20, 30], 40, 50], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[{ ...x }]] = tmpParamBare;
  return x;
};
$(f([[{ x: 1, y: 2, z: 3 }, 20, 30], 40, 50], 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = arrPatternStep$1;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$3 = undefined;
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return x;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpArrElement$1 = { x: 1, y: 2, z: 3 };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$7 = [tmpArrElement, 40, 50];
const tmpCalleeParam$9 = 200;
const tmpCalleeParam$5 = tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const tmpArrElement$1 /*:object*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(tmpArrElement$1, tmpCalleeParam$1, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
