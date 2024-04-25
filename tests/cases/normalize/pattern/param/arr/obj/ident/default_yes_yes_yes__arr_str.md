# Preval test case

# default_yes_yes_yes__arr_str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f(['abc', 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $(`pass`) } = $({ x: `fail2` })] = tmpParamBare === undefined ? $([{ x: `fail3` }]) : tmpParamBare;
  return x;
};
$(f([`abc`, 20, 30], 200));
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
    const tmpArrElement = { x: `fail3` };
    const tmpCalleeParam = [tmpArrElement];
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
    const tmpCalleeParam$1 = { x: `fail2` };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest$3 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$3) {
    x = $(`pass`);
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = [`abc`, 20, 30];
const tmpCalleeParam$7 = 200;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { x: `fail2` };
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest$3 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$3) {
    x = $(`pass`);
    return x;
  } else {
    x = objPatternBeforeDefault;
    return objPatternBeforeDefault;
  }
};
const tmpCalleeParam$5 = [`abc`, 20, 30];
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = [ ... b ];
  const e = d[ 0 ];
  let f = undefined;
  const g = e === undefined;
  if (g) {
    const h = { x: "fail2" };
    f = $( h );
  }
  else {
    f = e;
  }
  const i = f.x;
  let j = undefined;
  const k = i === undefined;
  if (k) {
    j = $( "pass" );
    return j;
  }
  else {
    j = i;
    return i;
  }
};
const l = [ "abc", 20, 30 ];
const m = a( l );
$( m );
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
