# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Ident > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x = $('pass') } = $({ x: 'fail2' })) {
  return x;
}
$(f('', 10));
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = ``.x;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_x);
} else {
  $(objPatternBeforeDefault);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = ``.x;
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
  let { x: x = $(`pass`) } = tmpParamBare === undefined ? $({ x: `fail2` }) : tmpParamBare;
  return x;
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
    const tmpCalleeParam = { x: `fail2` };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $(`pass`);
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCalleeParam$1 = f(``, 10);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
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
