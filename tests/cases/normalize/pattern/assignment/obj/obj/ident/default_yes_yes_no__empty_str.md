# Preval test case

# default_yes_yes_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'pass2' }) } = '');
$(y);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = ``.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { y: `pass2` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 /*:unknown*/ = objPatternAfterDefault.y;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(objPatternBeforeDefault$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = ``.x;
let objPatternAfterDefault = undefined;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $({ y: `pass2` });
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
if (objPatternBeforeDefault$1 === undefined) {
  y = $(`fail`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(objPatternBeforeDefault$1);
}
`````

## Pre Normal


`````js filename=intro
({ x: { y: y = $(`fail`) } = $({ y: `pass2` }) } = ``);
$(y);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = ``;
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { y: `pass2` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { y: "pass2" };
  b = $( d );
}
else {
  b = a;
}
const e = b.y;
const f = e === undefined;
if (f) {
  y = $( "fail" );
  $( y );
}
else {
  y = e;
  $( e );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - 1: { y: '"pass2"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
