# Preval test case

# default_yes_yes_no__arr_0.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes yes no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'fail2' })] = [0, 20, 30]);
$(x);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (0).x;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (0).x;
if (objPatternBeforeDefault === undefined) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## Pre Normal


`````js filename=intro
[{ x: x = $(`pass`) } = $({ x: `fail2` })] = [0, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [0, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { x: `fail2` };
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
const b = a === undefined;
if (b) {
  x = $( "pass" );
  $( x );
}
else {
  x = a;
  $( a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope