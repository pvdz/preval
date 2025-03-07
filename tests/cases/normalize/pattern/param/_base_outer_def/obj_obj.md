# Preval test case

# obj_obj.md

> Normalize > Pattern > Param > Base outer def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z}}} = d ) { return z }
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: {
      y: { z: z },
    },
  } = tmpParamBare === undefined ? d : tmpParamBare;
  return z;
};
`````

## Normalized


`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = d;
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let z = objPatternNoDefault$1.z;
  return z;
};
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
