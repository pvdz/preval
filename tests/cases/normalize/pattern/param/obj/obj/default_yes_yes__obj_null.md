# Preval test case

# default_yes_yes__obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'fail2' } })) {
  return 'bad';
}
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: {} = $({ x: `fail` }) } = tmpParamBare === undefined ? $({ x: { y: `fail2` } }) : tmpParamBare;
  return `bad`;
};
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { y: `fail2` };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { x: `fail` };
    objPatternAfterDefault = $(tmpCalleeParam$1);
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
    return `bad`;
  } else {
    return `bad`;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$5 = { x: null, b: 11, c: 12 };
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
null.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
