# Preval test case

# default_no_no__123.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x]]) {
  return x;
}
$(f(1, 2, 3, 4, 5, 200));
`````

## Settled


`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x]] = tmpParamBare;
  return x;
};
$(f(1, 2, 3, 4, 5, 200));
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
  let x = arrPatternSplat$1.slice(0);
  return x;
};
const tmpCalleeParam = f(1, 2, 3, 4, 5, 200);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...1 ];
throw "[Preval]: Array spread must crash before this line";
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
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
