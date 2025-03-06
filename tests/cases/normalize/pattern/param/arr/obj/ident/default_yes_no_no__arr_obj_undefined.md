# Preval test case

# default_yes_no_no__arr_obj_undefined.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes no no  arr obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return x;
}
$(f([{ x: undefined, y: 2, z: 3 }, 20, 30], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $(`pass`) }] = tmpParamBare;
  return x;
};
$(f([{ x: undefined, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $(`pass`);
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = f;
const tmpArrElement = { x: undefined, y: 2, z: 3 };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope