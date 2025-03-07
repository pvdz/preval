# Preval test case

# default_no_no_no__obj_0.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default no no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y } }) {
  return y;
}
$(f({ x: 0, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
const y /*:unknown*/ = (0).y;
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$((0).y);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { y: y },
  } = tmpParamBare;
  return y;
};
$(f({ x: 0, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let y = objPatternNoDefault.y;
  return y;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = { x: 0, b: 11, c: 12 };
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.y;
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
