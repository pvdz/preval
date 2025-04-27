# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'pass2' } })) {
  return 'ok';
}
$(f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: `pass2` };
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
const tmpBindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpBindingPatternObjRoot.x;
let tmpOPAD /*:unknown*/ = undefined;
let tmpObjPatternCrashTest /*:boolean*/ = false;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { x: `fail` };
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
const tmpObjLitVal = { y: `pass2` };
const tmpOPBD = $({ x: tmpObjLitVal }).x;
let tmpOPAD = undefined;
let tmpObjPatternCrashTest = false;
if (tmpOPBD === undefined) {
  tmpOPAD = $({ x: `fail` });
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
const a = { y: "pass2" };
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
let f = false;
const g = d === undefined;
if (g) {
  const h = { x: "fail" };
  e = $( h );
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"\\"pass2\\""}' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
