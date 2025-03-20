# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Binding > Arr > Obj > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{} = $('pass')] = '';
$('ok');
`````

## Settled


`````js filename=intro
const arrPatternStep /*:unknown*/ = $(`pass`);
let objPatternCrashTest /*:boolean*/ = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $(`pass`);
let objPatternCrashTest = arrPatternStep === undefined;
if (!objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````

## Pre Normal


`````js filename=intro
const [{} = $(`pass`)] = ``;
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = ``;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`pass`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
