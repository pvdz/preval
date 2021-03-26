# Preval test case

# obj_arr.md

> Normalize > Pattern > Param > Base inner def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y = a ]}) { return y }
`````

## Pre Normal

`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [y = a],
  } = tmpParamBare;
  return y;
};
`````

## Normalized

`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$1 = $$2;
    let arrPatternSplat$1 = $$3;
    let arrPatternBeforeDefault$1 = $$4;
    let y$1 = $$5;
    let tmpIfTest$1 = $$6;
    debugger;
    y$1 = a;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      y$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$3 = $$2;
    let arrPatternSplat$3 = $$3;
    let arrPatternBeforeDefault$3 = $$4;
    let y$3 = $$5;
    let tmpIfTest$3 = $$6;
    debugger;
    y$3 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternObjRoot$3,
      objPatternNoDefault$3,
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      y$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternNoDefault$5 = $$2;
    let arrPatternSplat$5 = $$3;
    let arrPatternBeforeDefault$5 = $$4;
    let y$5 = $$5;
    let tmpIfTest$5 = $$6;
    debugger;
    return y$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      arrPatternSplat,
      arrPatternBeforeDefault,
      y,
      tmpIfTest,
    );
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      arrPatternSplat,
      arrPatternBeforeDefault,
      y,
      tmpIfTest,
    );
    return tmpReturnArg$5;
  }
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
