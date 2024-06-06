# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('pass2')) {
  return x;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [x = $(`fail`)] = tmpParamBare === undefined ? $(`pass2`) : tmpParamBare;
  return x;
};
$(f());
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
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const bindingPatternArrRoot = $(`pass2`);
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpClusterSSA_x = $(`fail`);
    return tmpClusterSSA_x;
  } else {
    return arrPatternBeforeDefault;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( "pass2" );
  const c = [ ... b ];
  const d = c[ 0 ];
  const e = d === undefined;
  if (e) {
    const f = $( "fail" );
    return f;
  }
  else {
    return d;
  }
};
const g = a();
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass2'
 - 2: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
