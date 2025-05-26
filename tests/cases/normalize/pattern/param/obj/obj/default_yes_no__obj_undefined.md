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
const tmpSSA_tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
let tmpSSA_tmpObjPatternCrashTest /*:boolean*/ = tmpSSA_tmpOPAD === undefined;
if (tmpSSA_tmpObjPatternCrashTest) {
} else {
  tmpSSA_tmpObjPatternCrashTest = tmpSSA_tmpOPAD === null;
}
if (tmpSSA_tmpObjPatternCrashTest) {
  tmpSSA_tmpOPAD.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpOPAD = $({ x: `pass` });
let tmpSSA_tmpObjPatternCrashTest = tmpSSA_tmpOPAD === undefined;
if (!tmpSSA_tmpObjPatternCrashTest) {
  tmpSSA_tmpObjPatternCrashTest = tmpSSA_tmpOPAD === null;
}
if (tmpSSA_tmpObjPatternCrashTest) {
  tmpSSA_tmpOPAD.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = { x: `pass` };
    tmpOPAD = $(tmpCalleeParam);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpObjPatternCrashTest = tmpOPAD === undefined;
  if (tmpObjPatternCrashTest) {
  } else {
    tmpObjPatternCrashTest = tmpOPAD === null;
  }
  if (tmpObjPatternCrashTest) {
    tmpObjPatternCrashTest = tmpOPAD.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = { x: undefined, b: 11, c: 12 };
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


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
