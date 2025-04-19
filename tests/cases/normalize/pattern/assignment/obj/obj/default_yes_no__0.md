# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: {} = $({ x: 'pass' }) } = 0);
$('ok');
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Number_prototype.x;
let tmpOPAD /*:unknown*/ = undefined;
let tmpObjPatternCrashTest /*:boolean*/ = false;
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
const tmpOPBD = $Number_prototype.x;
let tmpOPAD = undefined;
let tmpObjPatternCrashTest = false;
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
const a = $Number_prototype.x;
let b = undefined;
let c = false;
const d = a === undefined;
if (d) {
  const e = { x: "pass" };
  b = $( e );
  c = b === undefined;
}
else {
  b = a;
}
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
