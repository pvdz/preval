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
let i = function (tmpParamPattern) {
  let {
    x: {
      y: { z = a },
    },
  } = tmpParamPattern;
  return z;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternBeforeDefault = objPatternNoDefault$1.z;
  let z = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternObjRoot$1,
    objPatternNoDefault$2,
    objPatternNoDefault$3,
    objPatternBeforeDefault$1,
    z$1,
    tmpIfTest$1,
  ) {
    z$1 = a;
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$2,
      objPatternNoDefault$3,
      objPatternBeforeDefault$1,
      z$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternObjRoot$2,
    objPatternNoDefault$4,
    objPatternNoDefault$5,
    objPatternBeforeDefault$2,
    z$2,
    tmpIfTest$2,
  ) {
    z$2 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternObjRoot$2,
      objPatternNoDefault$4,
      objPatternNoDefault$5,
      objPatternBeforeDefault$2,
      z$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternObjRoot$3,
    objPatternNoDefault$6,
    objPatternNoDefault$7,
    objPatternBeforeDefault$3,
    z$3,
    tmpIfTest$3,
  ) {
    return z$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternBeforeDefault,
      z,
      tmpIfTest,
    );
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternBeforeDefault,
      z,
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
