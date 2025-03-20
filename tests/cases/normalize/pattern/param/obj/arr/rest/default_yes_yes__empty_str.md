# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) } = $({ x: ['fail2'] })) {
  return y;
}
$(f('', 10));
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = ``.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:array*/ = [`pass`];
  objPatternAfterDefault = $(tmpCalleeParam$1);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat /*:array*/ = [...objPatternAfterDefault];
const y /*:array*/ = arrPatternSplat.slice(0);
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = ``.x;
let objPatternAfterDefault = undefined;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $([`pass`]);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
$([...objPatternAfterDefault].slice(0));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [...y] = $([`pass`]) } = tmpParamBare === undefined ? $({ x: [`fail2`] }) : tmpParamBare;
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
    const tmpObjLitVal = [`fail2`];
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = [`pass`];
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return y;
};
const tmpCalleeParam$3 = f(``, 10);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "pass" ];
  b = $( d );
}
else {
  b = a;
}
const e = [ ...b ];
const f = e.slice( 0 );
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
