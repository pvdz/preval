# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('fail')] = $('pass2')) {
  return x;
}
$(f(undefined, 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x] = $(`fail`)] = tmpParamBare === undefined ? $(`pass2`) : tmpParamBare;
  return x;
};
$(f(undefined, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $(`pass2`);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    arrPatternStep = $(`fail`);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_bindingPatternArrRoot = $(`pass2`);
const arrPatternSplat = [...tmpClusterSSA_bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  arrPatternStep = $(`fail`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass2" );
const b = [ ... a ];
const c = b[ 0 ];
let d = undefined;
const e = c === undefined;
if (e) {
  d = $( "fail" );
}
else {
  d = c;
}
const f = [ ... d ];
const g = f.slice( 0 );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass2'
 - 2: ['p']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
