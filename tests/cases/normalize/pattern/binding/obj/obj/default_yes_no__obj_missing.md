# Preval test case

# default_yes_no__obj_missing.md

> Normalize > Pattern > Binding > Obj > Obj > Default yes no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: {} = $({ x: 'pass' }) } = { b: 11, c: 12 };
$('ok');
`````


## Settled


`````js filename=intro
let tmpOPAD /*:unknown*/ /*ternaryConst*/ = undefined;
let tmpObjPatternCrashTest /*:boolean*/ = false;
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { x: `pass` };
  tmpOPAD = $(tmpCalleeParam);
  tmpObjPatternCrashTest = tmpOPAD === undefined;
} else {
  tmpOPAD = tmpOPBD;
}
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpOPAD === null;
}
if (tmpObjPatternCrashTest) {
  tmpOPAD.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpOPAD = undefined;
let tmpObjPatternCrashTest = false;
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  tmpOPAD = $({ x: `pass` });
  tmpObjPatternCrashTest = tmpOPAD === undefined;
} else {
  tmpOPAD = tmpOPBD;
}
if (!tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpOPAD === null;
}
if (tmpObjPatternCrashTest) {
  tmpOPAD.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = false;
const c = $Object_prototype.x;
const d = c === undefined;
if (d) {
  const e = { x: "pass" };
  a = $( e );
  b = a === undefined;
}
else {
  a = c;
}
if (b) {

}
else {
  b = a === null;
}
if (b) {
  a.cannotDestructureThis;
  $( "ok" );
}
else {
  $( "ok" );
}
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
