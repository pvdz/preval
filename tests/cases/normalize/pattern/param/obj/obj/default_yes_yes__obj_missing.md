# Preval test case

# default_yes_yes__obj_missing.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) } = $({ x: { y: 'fail2' } })) {
  return 'ok';
}
$(f({ b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
let objPatternCrashTest /*:boolean*/ = false;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { x: `pass` };
  objPatternAfterDefault = $(tmpCalleeParam$1);
  objPatternCrashTest = objPatternAfterDefault === undefined;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternAfterDefault === null;
}
if (objPatternCrashTest) {
  objPatternAfterDefault.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $Object_prototype.x;
let objPatternAfterDefault = undefined;
let objPatternCrashTest = false;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $({ x: `pass` });
  objPatternCrashTest = objPatternAfterDefault === undefined;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
if (!objPatternCrashTest) {
  objPatternCrashTest = objPatternAfterDefault === null;
}
if (objPatternCrashTest) {
  objPatternAfterDefault.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
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
