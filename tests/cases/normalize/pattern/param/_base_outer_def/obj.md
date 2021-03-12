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
let g = function (tmpParamDefault) {
  let { x } = tmpParamDefault === undefined ? b : tmpParamDefault;
  return x;
};
`````

## Normalized

`````js filename=intro
let g = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = b;
  } else {
    bindingPatternObjRoot = tmpParamDefault;
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
