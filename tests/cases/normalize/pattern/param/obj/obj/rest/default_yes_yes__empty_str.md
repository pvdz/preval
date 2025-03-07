# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f('', 10));
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = ``.x;
let tmpCalleeParam$3 /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { a: `pass` };
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
const objPatternBeforeDefault = ``.x;
let tmpCalleeParam$3 = undefined;
if (objPatternBeforeDefault === undefined) {
  tmpCalleeParam$3 = $({ a: `pass` });
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
  let { x: { ...y } = $({ a: `pass` }) } = tmpParamBare === undefined ? $({ x: { a: `fail2` } }) : tmpParamBare;
  return y;
};
$(f(``, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { a: `fail2` };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { a: `pass` };
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCalleeParam$3 = objPatternAfterDefault;
  const tmpCalleeParam$5 = [];
  let y = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return y;
};
const tmpCalleeParam$7 = f(``, 10);
$(tmpCalleeParam$7);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { a: "pass" };
  const e = $( d );
  b = e;
}
else {
  b = a;
}
const f = [];
const g = objPatternRest( b, f, undefined );
$( g );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
