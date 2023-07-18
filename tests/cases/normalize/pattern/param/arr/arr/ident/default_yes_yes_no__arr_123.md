# Preval test case

# default_yes_yes_no__arr_123.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])]) {
  return x;
}
$(f([1, 2, 3, , 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $(`fail`)] = $([`pass2`])] = tmpParamBare;
  return x;
};
$(f([1, 2, 3, , 4, 5], 200));
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
    const tmpCallCallee = $;
    const tmpCalleeParam = [`pass2`];
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $(`fail`);
    return x;
  } else {
    x = arrPatternBeforeDefault$1;
    return x;
  }
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = [1, 2, 3, , 4, 5];
const tmpCalleeParam$5 = 200;
const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`pass2`];
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    const tmpClusterSSA_x = $(`fail`);
    return tmpClusterSSA_x;
  } else {
    return arrPatternBeforeDefault$1;
  }
};
const tmpCalleeParam$3 = [1, 2, 3, , 4, 5];
const tmpCalleeParam$1 = f(tmpCalleeParam$3);
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = [ ... b,, ];
  const e = d[ 0 ];
  let f = undefined;
  const g = e === undefined;
  if (g) {
    const h = [ "pass2",, ];
    f = $( h );
  }
  else {
    f = e;
  }
  const i = [ ... f,, ];
  const j = i[ 0 ];
  const k = j === undefined;
  if (k) {
    const l = $( "fail" );
    return l;
  }
  else {
    return j;
  }
},;
const m = [ 1, 2, 3, , 4, 5,, ];
const n = a( m );
$( n );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
