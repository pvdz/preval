# Preval test case

# default_no_no__arr_undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default no no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f([undefined, 20, 30], 200));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(undefined, tmpCalleeParam$1, undefined);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(undefined, [], undefined));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x }] = tmpParamBare;
  return x;
};
$(f([undefined, 20, 30], 200));
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
  let x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return x;
};
const tmpCallCallee = f;
const tmpCalleeParam$5 = [undefined, 20, 30];
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 200);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( undefined, a, undefined );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
