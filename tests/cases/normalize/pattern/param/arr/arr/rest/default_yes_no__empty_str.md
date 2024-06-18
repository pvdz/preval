# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('pass')]) {
  return x;
}
$(f('', 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x] = $(`pass`)] = tmpParamBare;
  return x;
};
$(f(``, 200));
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
    arrPatternStep = $(`pass`);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(``, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_arrPatternStep = $(`pass`);
const arrPatternSplat$1 = [...tmpClusterSSA_arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
const b = [ ... a ];
const c = b.slice( 0 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: ['p', 'a', 's', 's']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
