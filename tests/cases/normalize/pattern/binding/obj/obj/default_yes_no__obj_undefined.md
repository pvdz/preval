# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Obj > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: {} = $({ x: 'pass' }) } = { x: undefined, b: 11, c: 12 };
$('ok');
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass` };
const objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam);
let objPatternCrashTest /*:boolean*/ = objPatternAfterDefault === undefined;
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
const objPatternAfterDefault = $({ x: `pass` });
let objPatternCrashTest = objPatternAfterDefault === undefined;
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

## Pre Normal


`````js filename=intro
const { x: {} = $({ x: `pass` }) } = { x: undefined, b: 11, c: 12 };
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { x: `pass` };
  objPatternAfterDefault = $(tmpCalleeParam);
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
