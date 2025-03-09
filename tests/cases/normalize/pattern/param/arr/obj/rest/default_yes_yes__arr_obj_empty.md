# Preval test case

# default_yes_yes__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([{}, 20, 30], 200));
`````

## Settled


`````js filename=intro
const tmpArrElement$1 /*:object*/ = {};
const tmpCalleeParam$5 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(tmpArrElement$1, tmpCalleeParam$5, undefined);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$1 = {};
$(objPatternRest(tmpArrElement$1, [], undefined));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: `fail` })] = tmpParamBare === undefined ? $([{ a: `fail2` }]) : tmpParamBare;
  return x;
};
$(f([{}, 20, 30], 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { a: `fail2` };
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
    const tmpCalleeParam$1 = { a: `fail` };
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCalleeParam$3 = arrPatternStep;
  const tmpCalleeParam$5 = [];
  let x = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return x;
};
const tmpCallCallee = f;
const tmpArrElement$1 = {};
const tmpCalleeParam$9 = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$7 = tmpCallCallee(tmpCalleeParam$9, 200);
$(tmpCalleeParam$7);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
