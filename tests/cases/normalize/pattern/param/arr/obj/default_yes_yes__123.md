# Preval test case

# default_yes_yes__123.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{} = $('pass')] = $(['fail2'])) {
  return 'ok';
}
$(f(undefined, 100));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`fail2`];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
let arrPatternStep /*:unknown*/ = undefined;
let objPatternCrashTest /*:boolean*/ = false;
const tmpIfTest$1 /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  arrPatternStep = $(`pass`);
  objPatternCrashTest = arrPatternStep === undefined;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $([`fail2`]);
const arrPatternBeforeDefault = [...bindingPatternArrRoot][0];
let arrPatternStep = undefined;
let objPatternCrashTest = false;
if (arrPatternBeforeDefault === undefined) {
  arrPatternStep = $(`pass`);
  objPatternCrashTest = arrPatternStep === undefined;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
if (!objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $(`pass`)] = tmpParamBare === undefined ? $([`fail2`]) : tmpParamBare;
  return `ok`;
};
$(f(undefined, 100));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail2`];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    arrPatternStep = $(`pass`);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCalleeParam$1 = f(undefined, 100);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "fail2" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
let e = undefined;
let f = false;
const g = d === undefined;
if (g) {
  e = $( "pass" );
  f = e === undefined;
}
else {
  e = d;
}
if (f) {

}
else {
  f = e === null;
}
if (f) {
  e.cannotDestructureThis;
  $( "ok" );
}
else {
  $( "ok" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['fail2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
