# Preval test case

# obj_ternary.md

> Normalize > Pattern > Assignment > Obj ternary
>
> Regression from obj param with default

Regression was causing infinite loop

## Input

`````js filename=intro
let f = function () {
  let {} = $ ? 1 : 2;
};
f();
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
let f = function () {
  debugger;
  let {} = $ ? 1 : 2;
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let bindingPatternObjRoot = undefined;
  if ($) {
    bindingPatternObjRoot = 1;
  } else {
    bindingPatternObjRoot = 2;
  }
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
    return undefined;
  } else {
    return undefined;
  }
};
f();
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
