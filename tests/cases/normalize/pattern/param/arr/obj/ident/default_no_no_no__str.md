# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f('abc'));
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = `a`.x;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`.x);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x }] = tmpParamBare;
  return x;
};
$(f(`abc`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
};
const tmpCalleeParam = f(`abc`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "a".x;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
