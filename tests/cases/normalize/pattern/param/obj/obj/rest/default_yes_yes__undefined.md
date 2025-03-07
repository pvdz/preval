# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'pass2' } })) {
  return y;
}
$(f(undefined, 10));
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { a: `pass2` };
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
const tmpClusterSSA_bindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const objPatternBeforeDefault /*:unknown*/ = tmpClusterSSA_bindingPatternObjRoot.x;
let tmpCalleeParam$3 /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { a: `fail` };
  const tmpClusterSSA_objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam$1);
  tmpCalleeParam$3 = tmpClusterSSA_objPatternAfterDefault;
} else {
  tmpCalleeParam$3 = objPatternBeforeDefault;
}
const tmpCalleeParam$5 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { a: `pass2` };
const objPatternBeforeDefault = $({ x: tmpObjLitVal }).x;
let tmpCalleeParam$3 = undefined;
if (objPatternBeforeDefault === undefined) {
  tmpCalleeParam$3 = $({ a: `fail` });
} else {
  tmpCalleeParam$3 = objPatternBeforeDefault;
}
$(objPatternRest(tmpCalleeParam$3, [], undefined));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: `fail` }) } = tmpParamBare === undefined ? $({ x: { a: `pass2` } }) : tmpParamBare;
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
    const tmpObjLitVal = { a: `pass2` };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { a: `fail` };
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCalleeParam$3 = objPatternAfterDefault;
  const tmpCalleeParam$5 = [];
  let y = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return y;
};
const tmpCalleeParam$7 = f(undefined, 10);
$(tmpCalleeParam$7);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { a: "pass2" };
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
const f = d === undefined;
if (f) {
  const g = { a: "fail" };
  const h = $( g );
  e = h;
}
else {
  e = d;
}
const i = [];
const j = objPatternRest( e, i, undefined );
$( j );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '{"a":"\\"pass2\\""}' }
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
