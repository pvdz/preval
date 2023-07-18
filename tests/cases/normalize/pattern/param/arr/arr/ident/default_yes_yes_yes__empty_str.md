# Preval test case

# default_yes_yes_yes__empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])] = $(['fail3'])) {
  return x;
}
$(f('', 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $(`fail`)] = $([`pass2`])] = tmpParamBare === undefined ? $([`fail3`]) : tmpParamBare;
  return x;
};
$(f(``, 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = [`fail3`];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = [`pass2`];
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$3 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$3) {
    x = $(`fail`);
    return x;
  } else {
    x = arrPatternBeforeDefault$1;
    return x;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(``, 200);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam$1 = [`pass2`];
  const arrPatternStep = $(tmpCalleeParam$1);
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  const tmpIfTest$3 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$3) {
    const tmpClusterSSA_x = $(`fail`);
    return tmpClusterSSA_x;
  } else {
    return arrPatternBeforeDefault$1;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ "pass2",, ];
  const c = $( b );
  const d = [ ... c,, ];
  const e = d[ 0 ];
  const f = e === undefined;
  if (f) {
    const g = $( "fail" );
    return g;
  }
  else {
    return e;
  }
},;
const h = a();
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
