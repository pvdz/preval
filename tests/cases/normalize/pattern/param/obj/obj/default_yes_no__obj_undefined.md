# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) }) {
  return 'ok';
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass` };
const objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam);
let tmpClusterSSA_objPatternCrashTest /*:boolean*/ = objPatternAfterDefault === undefined;
if (tmpClusterSSA_objPatternCrashTest) {
} else {
  tmpClusterSSA_objPatternCrashTest = objPatternAfterDefault === null;
}
if (tmpClusterSSA_objPatternCrashTest) {
  objPatternAfterDefault.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternAfterDefault = $({ x: `pass` });
let tmpClusterSSA_objPatternCrashTest = objPatternAfterDefault === undefined;
if (!tmpClusterSSA_objPatternCrashTest) {
  tmpClusterSSA_objPatternCrashTest = objPatternAfterDefault === null;
}
if (tmpClusterSSA_objPatternCrashTest) {
  objPatternAfterDefault.cannotDestructureThis;
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
  let { x: {} = $({ x: `pass` }) } = tmpParamBare;
  return `ok`;
};
$(f({ x: undefined, b: 11, c: 12 }, 10));
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
    const tmpCalleeParam = { x: `pass` };
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$3 = { x: undefined, b: 11, c: 12 };
const tmpCalleeParam$1 = tmpCallCallee(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: "pass" };
const b = $( a );
let c = b === undefined;
if (c) {

}
else {
  c = b === null;
}
if (c) {
  b.cannotDestructureThis;
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
 - 1: { x: '"pass"' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
