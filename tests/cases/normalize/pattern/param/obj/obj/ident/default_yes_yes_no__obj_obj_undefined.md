# Preval test case

# default_yes_yes_no__obj_obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
const tmpClusterSSA_y /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`pass`));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y: y = $(`pass`) } = $({ y: `fail2` }) } = tmpParamBare;
  return y;
};
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
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
    const tmpCalleeParam = { y: `fail2` };
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    y = $(`pass`);
    return y;
  } else {
    y = objPatternBeforeDefault$1;
    return y;
  }
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: undefined, z: 3 };
const tmpCalleeParam$3 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$1 = tmpCallCallee(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
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
