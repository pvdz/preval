# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Obj > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: {} = $({ x: 'pass' }) } = { x: undefined, b: 11, c: 12 });
$('ok');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass` };
const tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
let tmpClusterSSA_tmpObjPatternCrashTest /*:boolean*/ = tmpOPAD === undefined;
if (tmpClusterSSA_tmpObjPatternCrashTest) {
} else {
  tmpClusterSSA_tmpObjPatternCrashTest = tmpOPAD === null;
}
if (tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpOPAD.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPAD = $({ x: `pass` });
let tmpClusterSSA_tmpObjPatternCrashTest = tmpOPAD === undefined;
if (!tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpClusterSSA_tmpObjPatternCrashTest = tmpOPAD === null;
}
if (tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpOPAD.cannotDestructureThis;
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
