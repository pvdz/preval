# Preval test case

# default_yes_yes_no__arr_elided.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes yes no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'pass2' })] = [, , , 1, 20, 30]);
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass2` };
const arrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const objPatternBeforeDefault /*:unknown*/ = arrPatternStep.x;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $({ x: `pass2` }).x;
if (objPatternBeforeDefault === undefined) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(x);
}
`````

## Pre Normal


`````js filename=intro
[{ x: x = $(`pass`) } = $({ x: `pass2` })] = [, , , 1, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [, , , 1, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { x: `pass2` };
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: "pass2" };
const b = $( a );
const c = b.x;
const d = c === undefined;
if (d) {
  x = $( "pass" );
  $( x );
}
else {
  x = c;
  $( x );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - 1: { x: '"pass2"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope