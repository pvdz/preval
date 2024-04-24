# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['pass3'])) {
  return x;
}
$(f(undefined, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $(`fail`)] = $([`fail2`])] = tmpParamBare === undefined ? $([`pass3`]) : tmpParamBare;
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
    const tmpCallCallee = $;
    const tmpCalleeParam = [`pass3`];
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
    const tmpCalleeParam$1 = [`fail2`];
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
const tmpCalleeParam$3 = f(undefined, 200);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = [`pass3`];
  const bindingPatternArrRoot = $(tmpCalleeParam);
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = [`fail2`];
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$3 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$3) {
    x = $(`fail`);
    return x;
  } else {
    x = arrPatternBeforeDefault$1;
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
  const b = [ "pass3",, ];
  const c = $( b );
  const d = [ ... c,, ];
  const e = d[ 0 ];
  let f = undefined;
  const g = e === undefined;
  if (g) {
    const h = [ "fail2",, ];
    f = $( h );
  }
  else {
    f = e;
  }
  const i = [ ... f,, ];
  const j = i[ 0 ];
  let k = undefined;
  const l = j === undefined;
  if (l) {
    k = $( "fail" );
    return k;
  }
  else {
    k = j;
    return j;
  }
};
const m = a();
$( m );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass3']
 - 2: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
