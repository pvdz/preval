# Preval test case

# default_no__empty_str.md

> Normalize > Pattern > Param > Arr > Rest > Default no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([...x]) {
  return x;
}
$(f('', 200));
`````

## Settled


`````js filename=intro
const x /*:array*/ = [];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [...x] = tmpParamBare;
  return x;
};
$(f(``, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x = arrPatternSplat.slice(0);
  return x;
};
const tmpCalleeParam = f(``, 200);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
