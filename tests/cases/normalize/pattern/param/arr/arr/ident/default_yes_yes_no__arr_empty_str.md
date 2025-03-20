# Preval test case

# default_yes_yes_no__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('pass')] = $(['fail2'])]) {
  return x;
}
$(f(['', 4, 5], 200));
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
  let [[x = $(`pass`)] = $([`fail2`])] = tmpParamBare;
  return x;
};
$(f([``, 4, 5], 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail2`];
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $(`pass`);
    return x;
  } else {
    x = arrPatternBeforeDefault$1;
    return x;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$3 = [``, 4, 5];
const tmpCalleeParam$1 = tmpCallCallee(tmpCalleeParam$3, 200);
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

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
