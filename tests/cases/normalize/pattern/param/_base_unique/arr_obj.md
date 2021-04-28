# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base unique > Arr obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function h([{ x }]) {
  { let x = 2; }
  return x
}
h()
`````

## Pre Normal

`````js filename=intro
let h = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x$1 }] = tmpParamBare;
  {
    let x$3 = 2;
  }
  return x$1;
};
let x = 1;
h();
`````

## Normalized

`````js filename=intro
let h = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let x$1 = arrPatternStep.x;
  let x$3 = 2;
  return x$1;
};
let x = 1;
h();
`````

## Output

`````js filename=intro
const arrPatternSplat = [...undefined];
const arrPatternStep = arrPatternSplat[0];
arrPatternStep.x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
