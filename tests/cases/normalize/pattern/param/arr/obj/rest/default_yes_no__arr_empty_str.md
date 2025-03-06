# Preval test case

# default_yes_no__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return x;
}
$(f(['', 20, 30], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: `fail` })] = tmpParamBare;
  return x;
};
$(f([``, 20, 30], 200));
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
    const tmpCalleeParam = { a: `fail` };
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCalleeParam$1 = arrPatternStep;
  const tmpCalleeParam$3 = [];
  let x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
  return x;
};
const tmpCallCallee = f;
const tmpCalleeParam$7 = [``, 20, 30];
const tmpCalleeParam$5 = tmpCallCallee(tmpCalleeParam$7, 200);
$(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(``, tmpCalleeParam$3, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( "", a, undefined );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope