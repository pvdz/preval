# Preval test case

# default_yes_no__missing.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes no  missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) }) {
  return y;
}
$(f({ a: 11, b: 12 }, 10));
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [`pass`];
  objPatternAfterDefault = $(tmpCalleeParam);
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
const objPatternBeforeDefault = $Object_prototype.x;
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
  let { x: [...y] = $([`pass`]) } = tmpParamBare;
  return y;
};
$(f({ a: 11, b: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`pass`];
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return y;
};
const tmpCallCallee = f;
const tmpCalleeParam$3 = { a: 11, b: 12 };
const tmpCalleeParam$1 = tmpCallCallee(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
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
