# Preval test case

# default_no_no__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default no no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f([{}, 20, 30], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x }] = tmpParamBare;
  return x;
};
$(f([{}, 20, 30], 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  let x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return x;
};
const tmpCallCallee = f;
const tmpArrElement = {};
const tmpCalleeParam$5 = [tmpArrElement, 20, 30];
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 200);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpArrElement /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
