# Preval test case

# shorthand_renaming.md

> Normalize > Object > Shorthand renaming
>
> The unique naming system must properly handle property shorthands

## Input

`````js filename=intro
let f = function({x = 10}) {
  return x;
}
let g = function({x = 10}) {
  let y = {x}; // Make sure x gets renamed
  return [x, y];
}
$(f(), g());
`````

## Settled


`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x = 10 } = tmpParamBare;
  return x;
};
let g = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let { x: x$1 = 10 } = tmpParamBare$1;
  let y = { x: x$1 };
  return [x$1, y];
};
$(f(), g());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = 10;
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
let g = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let bindingPatternObjRoot$1 = tmpParamBare$1;
  let objPatternBeforeDefault$1 = bindingPatternObjRoot$1.x;
  let x$1 = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x$1 = 10;
  } else {
    x$1 = objPatternBeforeDefault$1;
  }
  let y = { x: x$1 };
  const tmpReturnArg = [x$1, y];
  return tmpReturnArg;
};
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
$(tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
undefined.x;
throw "[Preval]: Can not reach here";
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
