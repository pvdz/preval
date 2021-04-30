# Preval test case

# obj.md

> Normalize > Pattern > Param > Base outer def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x } = b ) { return x }
`````

## Pre Normal

`````js filename=intro
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x } = tmpParamBare === undefined ? b : tmpParamBare;
  return x;
};
`````

## Normalized

`````js filename=intro
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = b;
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let x = bindingPatternObjRoot.x;
  return x;
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
