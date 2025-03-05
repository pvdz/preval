# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([
  {
    x: { y },
  },
]) {
  return y;
}
$(f([{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10], 100));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [
    {
      x: { y: y },
    },
  ] = tmpParamBare;
  return y;
};
$(f([{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10], 100));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let y = objPatternNoDefault.y;
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 100);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
