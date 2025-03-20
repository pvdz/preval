# Preval test case

# default_yes_yes_yes__arr_arr_elided.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  arr arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('pass')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f([[, , , 201], 4, 5], 200));
`````

## Settled


`````js filename=intro
const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_x);
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
  let [[x = $(`pass`)] = $([`fail2`])] = tmpParamBare === undefined ? $([`fail3`]) : tmpParamBare;
  return x;
};
$(f([[, , , 201], 4, 5], 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail3`];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = [`fail2`];
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$3 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$3) {
    x = $(`pass`);
    return x;
  } else {
    x = arrPatternBeforeDefault$1;
    return x;
  }
};
const tmpCallCallee = f;
const tmpArrElement = [, , , 201];
const tmpCalleeParam$5 = [tmpArrElement, 4, 5];
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 200);
$(tmpCalleeParam$3);
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

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
