# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'pass3' }])) {
  return x;
}
$(f(undefined));
`````

## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = { x: `pass3` };
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
let arrPatternStep /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { x: `fail2` };
  arrPatternStep = $(tmpCalleeParam$1);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault /*:unknown*/ = arrPatternStep.x;
const tmpIfTest$3 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$3) {
  const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_x);
} else {
  $(objPatternBeforeDefault);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { x: `pass3` };
const bindingPatternArrRoot = $([tmpArrElement]);
const arrPatternBeforeDefault = [...bindingPatternArrRoot][0];
let arrPatternStep = undefined;
if (arrPatternBeforeDefault === undefined) {
  arrPatternStep = $({ x: `fail2` });
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
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
  let [{ x: x = $(`pass`) } = $({ x: `fail2` })] = tmpParamBare === undefined ? $([{ x: `pass3` }]) : tmpParamBare;
  return x;
};
$(f(undefined));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { x: `pass3` };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { x: `fail2` };
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest$3 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$3) {
    x = $(`pass`);
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCalleeParam$3 = f(undefined);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: "pass3" };
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
let f = undefined;
const g = e === undefined;
if (g) {
  const h = { x: "fail2" };
  f = $( h );
}
else {
  f = e;
}
const i = f.x;
const j = i === undefined;
if (j) {
  const k = $( "pass" );
  $( k );
}
else {
  $( i );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [{ x: '"pass3"' }]
 - 2: 'pass3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope