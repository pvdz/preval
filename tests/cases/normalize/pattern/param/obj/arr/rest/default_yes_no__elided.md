# Preval test case

# default_yes_no__elided.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes no  elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] = $(['fail']) }) {
  return y;
}
$(f({ x: [, , , 1], a: 11, b: 12 }, 10));
`````

## Settled


`````js filename=intro
const y /*:array*/ = [undefined, undefined, undefined, 1];
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([undefined, undefined, undefined, 1]);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [...y] = $([`fail`]) } = tmpParamBare;
  return y;
};
$(f({ x: [, , , 1], a: 11, b: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail`];
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = [, , , 1];
const tmpCalleeParam$3 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$1 = tmpCallCallee(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
