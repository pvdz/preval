# Preval test case

# default_yes_no_no__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes no no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('pass')]]) {
  return x;
}
$(f(['', 4, 5], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $(`pass`)]] = tmpParamBare;
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
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $(`pass`);
    return x;
  } else {
    x = arrPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [``, 4, 5];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
$inlinedFunction: {
  const tmpClusterSSA_x = $(`pass`);
  tmpCalleeParam = tmpClusterSSA_x;
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  const b = $( "pass" );
  a = b;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
