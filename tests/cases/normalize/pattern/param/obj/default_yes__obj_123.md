# Preval test case

# default_yes__obj_123.md

> Normalize > Pattern > Param > Obj > Default yes  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'ok';
}
$(f({ a: 1, b: 2, c: 3 }, 10));
`````

## Settled


`````js filename=intro
$(`ok`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ok`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare === undefined ? $(`fail`) : tmpParamBare;
  return `ok`;
};
$(f({ a: 1, b: 2, c: 3 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = $(`fail`);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = { a: 1, b: 2, c: 3 };
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
