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
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
let objPatternCrashTest /*:boolean*/ = false;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { x: `pass` };
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
} else {
}
$(`ok`);
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
}
$(`ok`);
`````

## Pre Normal


`````js filename=intro
const { x: {} = $({ x: `pass` }) } = { b: 11, c: 12 };
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { b: 11, c: 12 };
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
} else {
}
$(`ok`);
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
}
$( "ok" );
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
