# Preval test case

# default_yes_no__empty.md

> Normalize > Pattern > Binding > Obj > Obj > Default yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: {} = $({ x: 'fail' }) } = 1;
$('bad');
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
let objPatternAfterDefault /*:unknown*/ = undefined;
let objPatternCrashTest /*:boolean*/ = false;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { x: `fail` };
  objPatternAfterDefault = $(tmpCalleeParam);
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
  $(`bad`);
} else {
  $(`bad`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (1).x;
let objPatternAfterDefault = undefined;
let objPatternCrashTest = false;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $({ x: `fail` });
  objPatternCrashTest = objPatternAfterDefault === undefined;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
if (!objPatternCrashTest) {
  objPatternCrashTest = objPatternAfterDefault === null;
}
if (objPatternCrashTest) {
  objPatternAfterDefault.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
let b = undefined;
let c = false;
const d = a === undefined;
if (d) {
  const e = { x: "fail" };
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
  $( "bad" );
}
else {
  $( "bad" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '"fail"' }
 - 2: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
