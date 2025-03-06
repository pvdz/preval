# Preval test case

# default_yes_yes__arr_0.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([0, 20, 30], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: `fail` })] = tmpParamBare === undefined ? $([{ a: `fail2` }]) : tmpParamBare;
  return x;
};
$(f([0, 20, 30], 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { a: `fail2` };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { a: `fail` };
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCalleeParam$3 = arrPatternStep;
  const tmpCalleeParam$5 = [];
  let x = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return x;
};
const tmpCallCallee = f;
const tmpCalleeParam$9 = [0, 20, 30];
const tmpCalleeParam$7 = tmpCallCallee(tmpCalleeParam$9, 200);
$(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const tmpCalleeParam$5 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(0, tmpCalleeParam$5, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( 0, a, undefined );
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