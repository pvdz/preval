# Preval test case

# obj_obj.md

> Normalize > Pattern > Param > Base outer def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z}}} = d ) { return z }
`````

## Pre Normal

`````js filename=intro
let i = function (tmpParamDefault) {
  let {
    x: {
      y: { z },
    },
  } = tmpParamDefault === undefined ? d : tmpParamDefault;
  return z;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = d;
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let z = objPatternNoDefault$1.z;
  return z;
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
