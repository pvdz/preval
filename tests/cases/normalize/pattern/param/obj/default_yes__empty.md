# Preval test case

# default_yes__empty.md

> Normalize > Pattern > Param > Obj > Default yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f());
`````


## Settled


`````js filename=intro
const tmpBindingPatternObjRoot /*:unknown*/ = $(`pass`);
let tmpObjPatternCrashTest /*:boolean*/ = tmpBindingPatternObjRoot === undefined;
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpBindingPatternObjRoot === null;
}
if (tmpObjPatternCrashTest) {
  tmpBindingPatternObjRoot.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternObjRoot = $(`pass`);
let tmpObjPatternCrashTest = tmpBindingPatternObjRoot === undefined;
if (!tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpBindingPatternObjRoot === null;
}
if (tmpObjPatternCrashTest) {
  tmpBindingPatternObjRoot.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
let b = a === undefined;
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
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
