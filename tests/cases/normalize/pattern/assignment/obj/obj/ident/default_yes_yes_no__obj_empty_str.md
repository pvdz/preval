# Preval test case

# default_yes_yes_no__obj_empty_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: '', b: 11, c: 12 });
$(y);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault$1 /*:unknown*/ = ``.y;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(y);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault$1 = ``.y;
if (objPatternBeforeDefault$1 === undefined) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(y);
}
`````

## Pre Normal


`````js filename=intro
({ x: { y: y = $(`pass`) } = $({ y: `fail2` }) } = { x: ``, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: ``, b: 11, c: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { y: `fail2` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`pass`);
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".y;
const b = a === undefined;
if (b) {
  y = $( "pass" );
  $( y );
}
else {
  y = a;
  $( y );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
