# Preval test case

# default_yes_no_no__obj_0.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('pass') } }) {
  return y;
}
$(f({ x: 0, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (0).y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_y /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_y);
} else {
  $(objPatternBeforeDefault);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (0).y;
if (objPatternBeforeDefault === undefined) {
  $($(`pass`));
} else {
  $(objPatternBeforeDefault);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { y: y = $(`pass`) },
  } = tmpParamBare;
  return y;
};
$(f({ x: 0, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = $(`pass`);
    return y;
  } else {
    y = objPatternBeforeDefault;
    return y;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = { x: 0, b: 11, c: 12 };
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.y;
const b = a === undefined;
if (b) {
  const c = $( "pass" );
  $( c );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
