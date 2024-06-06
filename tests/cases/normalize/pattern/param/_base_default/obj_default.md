# Preval test case

# obj_default.md

> Normalize > Pattern > Param > Base default > Obj default
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

Regression was causing infinite loop

#TODO

## Input

`````js filename=intro
function f({} = 1) {
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare === undefined ? 1 : tmpParamBare;
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = 1;
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
    return undefined;
  } else {
    return undefined;
  }
};
f();
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
