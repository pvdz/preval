# Preval test case

# obj_obj.md

> Normalize > Pattern > Param > Base unique > Obj obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let z = 1;
function i({x: {y: {z}}}) {
  { let z = 2; }
  return z
}
`````

## Pre Normal

`````js filename=intro
let i = function (tmpParamPattern) {
  let {
    x: {
      y: { z$1 },
    },
  } = tmpParamPattern;
  {
    let z$2 = 2;
  }
  return z$1;
};
let z = 1;
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let z$1 = objPatternNoDefault$1.z$1;
  let z$2 = 2;
  return z$1;
};
let z = 1;
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
