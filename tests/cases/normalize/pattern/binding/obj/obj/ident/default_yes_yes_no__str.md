# Preval test case

# default_yes_yes_no__str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'pass2' }) } = 'abc';
$(y);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = `abc`.x;
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
  const tmpClusterSSA_y /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_y);
} else {
  $(objPatternBeforeDefault$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = `abc`.x;
let objPatternAfterDefault = undefined;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $({ y: `pass2` });
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
if (objPatternBeforeDefault$1 === undefined) {
  $($(`fail`));
} else {
  $(objPatternBeforeDefault$1);
}
`````

## Pre Normal


`````js filename=intro
const { x: { y: y = $(`fail`) } = $({ y: `pass2` }) } = `abc`;
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = `abc`;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { y: `pass2` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y = undefined;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(objPatternBeforeDefault$1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
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
  const g = $( "fail" );
  $( g );
}
else {
  $( e );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
