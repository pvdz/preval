# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'pass2' }])) {
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: `fail` })] = tmpParamBare === undefined ? $([{ a: `pass2` }]) : tmpParamBare;
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
    const tmpCallCallee = $;
    const tmpArrElement = { a: `pass2` };
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
    const tmpCalleeParam$1 = { a: `fail` };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCallCallee$3 = objPatternRest;
  const tmpCalleeParam$3 = arrPatternStep;
  const tmpCalleeParam$5 = [];
  const tmpCalleeParam$7 = undefined;
  let x = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
  return x;
};
const tmpCallCallee$5 = $;
const tmpCalleeParam$9 = f();
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const tmpArrElement = { a: `pass2` };
const tmpCalleeParam = [tmpArrElement];
const bindingPatternArrRoot = $(tmpCalleeParam);
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = { a: `fail` };
  arrPatternStep = $(tmpCalleeParam$1);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const tmpCalleeParam$5 = [];
const x = objPatternRest(arrPatternStep, tmpCalleeParam$5, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { a: "pass2" };
const b = [ a ];
const c = $( b );
const d = [ ... c ];
const e = d[ 0 ];
let f = undefined;
const g = e === undefined;
if (g) {
  const h = { a: "fail" };
  f = $( h );
}
else {
  f = e;
}
const i = [];
const j = objPatternRest( f, i, undefined );
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [{ a: '"pass2"' }]
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
