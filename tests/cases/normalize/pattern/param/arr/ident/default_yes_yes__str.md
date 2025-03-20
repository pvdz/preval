# Preval test case

# default_yes_yes__str.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f('xyz', 200));
`````

## Settled


`````js filename=intro
$(`x`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [x = $(`fail`)] = tmpParamBare === undefined ? $(`fail2`) : tmpParamBare;
  return x;
};
$(f(`xyz`, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $(`fail2`);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $(`fail`);
    return x;
  } else {
    x = arrPatternBeforeDefault;
    return x;
  }
};
const tmpCalleeParam = f(`xyz`, 200);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "x" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
