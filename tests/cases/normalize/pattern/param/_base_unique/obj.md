# Preval test case

# obj.md

> Normalize > Pattern > Param > Base unique > Obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function g({ x }) {
  { let x = 2; }
  return x
}
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
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x$1 } = tmpParamBare;
  {
    let x$3 = 2;
  }
  return x$1;
};
let x = 1;
`````

## Normalized


`````js filename=intro
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let x$1 = bindingPatternObjRoot.x;
  let x$3 = 2;
  return x$1;
};
let x = 1;
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
