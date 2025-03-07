# Preval test case

# obj_ele_default.md

> Normalize > Pattern > Binding > Obj ele default
>
> From tenko

This would crash.

## Input

`````js filename=intro
function f(a = {}) {
  let {
    x = false,
  } = a;
}
$(f());
`````

## Settled


`````js filename=intro
$Object_prototype.x;
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$Object_prototype.x;
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? {} : tmpParamBare;
  let { x: x = false } = a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = {};
  } else {
    a = tmpParamBare;
  }
  let bindingPatternObjRoot = a;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = false;
    return undefined;
  } else {
    x = objPatternBeforeDefault;
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$Object_prototype.x;
$( undefined );
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
