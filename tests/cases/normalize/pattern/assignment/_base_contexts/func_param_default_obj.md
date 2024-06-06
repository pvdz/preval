# Preval test case

# func_param_default_obj.md

> Normalize > Pattern > Assignment > Base contexts > Func param default obj
>
> Testing simple pattern normalizations

#TODO: arrow

## Input

`````js filename=intro
const f = (a = { x } = 1) => { return a };
`````

## Pre Normal


`````js filename=intro
const f = ($$0) => {
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? ({ x: x } = 1) : tmpParamBare;
  return a;
};
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpNestedAssignObjPatternRhs = 1;
    x = tmpNestedAssignObjPatternRhs.x;
    a = tmpNestedAssignObjPatternRhs;
    return a;
  } else {
    a = tmpParamBare;
    return a;
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
