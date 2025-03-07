# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'pass3' } })) {
  return y;
}
$(f(undefined, 10));
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: `pass3` };
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
const tmpClusterSSA_bindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const objPatternBeforeDefault /*:unknown*/ = tmpClusterSSA_bindingPatternObjRoot.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { y: `fail2` };
  objPatternAfterDefault = $(tmpCalleeParam$1);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 /*:unknown*/ = objPatternAfterDefault.y;
const tmpIfTest$3 /*:boolean*/ = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$3) {
  const tmpClusterSSA_y /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_y);
} else {
  $(objPatternBeforeDefault$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { y: `pass3` };
const objPatternBeforeDefault = $({ x: tmpObjLitVal }).x;
let objPatternAfterDefault = undefined;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $({ y: `fail2` });
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y: y = $(`fail`) } = $({ y: `fail2` }) } = tmpParamBare === undefined ? $({ x: { y: `pass3` } }) : tmpParamBare;
  return y;
};
$(f(undefined, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { y: `pass3` };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { y: `fail2` };
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y = undefined;
  const tmpIfTest$3 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$3) {
    y = $(`fail`);
    return y;
  } else {
    y = objPatternBeforeDefault$1;
    return y;
  }
};
const tmpCalleeParam$3 = f(undefined, 10);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: "pass3" };
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
const f = d === undefined;
if (f) {
  const g = { y: "fail2" };
  e = $( g );
}
else {
  e = d;
}
const h = e.y;
const i = h === undefined;
if (i) {
  const j = $( "fail" );
  $( j );
}
else {
  $( h );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '{"y":"\\"pass3\\""}' }
 - 2: 'pass3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
