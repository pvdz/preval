# Preval test case

# default_no_no_no__arr_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default no no no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x]]) {
  return x;
}
$(f(['abc', 4, 5], 200));
`````

## Settled


`````js filename=intro
$(`a`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x]] = tmpParamBare;
  return x;
};
$(f([`abc`, 4, 5], 200));
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
  let x = arrPatternSplat$1[0];
  return x;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = [`abc`, 4, 5];
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "a" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
