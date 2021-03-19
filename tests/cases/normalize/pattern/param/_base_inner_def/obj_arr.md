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
let i = function (tmpParamPattern) {
  let {
    x: [y = a],
  } = tmpParamPattern;
  return y;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternObjRoot$1,
    objPatternNoDefault$1,
    arrPatternSplat$1,
    arrPatternBeforeDefault$1,
    y$1,
    tmpIfTest$1,
  ) {
    y$1 = a;
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      y$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternObjRoot$2,
    objPatternNoDefault$2,
    arrPatternSplat$2,
    arrPatternBeforeDefault$2,
    y$2,
    tmpIfTest$2,
  ) {
    y$2 = arrPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternObjRoot$2,
      objPatternNoDefault$2,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      y$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternObjRoot$3,
    objPatternNoDefault$3,
    arrPatternSplat$3,
    arrPatternBeforeDefault$3,
    y$3,
    tmpIfTest$3,
  ) {
    return y$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternNoDefault,
      arrPatternSplat,
      arrPatternBeforeDefault,
      y,
      tmpIfTest,
    );
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternNoDefault,
      arrPatternSplat,
      arrPatternBeforeDefault,
      y,
      tmpIfTest,
    );
    return tmpReturnArg$3;
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
