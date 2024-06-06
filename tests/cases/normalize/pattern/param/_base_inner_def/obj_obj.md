# Preval test case

# obj_obj.md

> Normalize > Pattern > Param > Base inner def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z = a }}}) { return z }
`````

## Pre Normal


`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: {
      y: { z: z = a },
    },
  } = tmpParamBare;
  return z;
};
`````

## Normalized


`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternBeforeDefault = objPatternNoDefault$1.z;
  let z = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    z = a;
    return z;
  } else {
    z = objPatternBeforeDefault;
    return z;
  }
};
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

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
