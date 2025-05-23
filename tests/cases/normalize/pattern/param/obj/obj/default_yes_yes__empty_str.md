# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) } = $({ x: { y: 'fail2' } })) {
  return 'ok';
}
$(f('', 10));
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.x;
let tmpOPAD /*:unknown*/ /*ternaryConst*/ = undefined;
let tmpObjPatternCrashTest /*:boolean*/ = false;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { x: `pass` };
  tmpOPAD = $(tmpCalleeParam$1);
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
const tmpOPBD = $String_prototype.x;
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
const a = $String_prototype.x;
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
