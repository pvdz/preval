# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([...x] = $(['pass'])) {
  return x;
}
$(f(undefined, 200));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass`];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const x /*:array*/ = arrPatternSplat.slice(0);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $([`pass`]);
$([...bindingPatternArrRoot].slice(0));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [...x] = tmpParamBare === undefined ? $([`pass`]) : tmpParamBare;
  return x;
};
$(f(undefined, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`pass`];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x = arrPatternSplat.slice(0);
  return x;
};
const tmpCalleeParam$1 = f(undefined, 200);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass" ];
const b = $( a );
const c = [ ...b ];
const d = c.slice( 0 );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
