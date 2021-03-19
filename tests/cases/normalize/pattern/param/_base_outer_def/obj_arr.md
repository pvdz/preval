# Preval test case

# obj_arr.md

> Normalize > Pattern > Param > Base outer def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y ]} = c ) { return y }
`````

## Pre Normal

`````js filename=intro
let i = function (tmpParamDefault) {
  let {
    x: [y],
  } = tmpParamDefault === undefined ? c : tmpParamDefault;
  return y;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1) {
    bindingPatternObjRoot$1 = c;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2) {
    bindingPatternObjRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternObjRoot$3, tmpIfTest$3) {
    let objPatternNoDefault$1 = bindingPatternObjRoot$3.x;
    let arrPatternSplat$1 = [...objPatternNoDefault$1];
    let y$1 = arrPatternSplat$1[0];
    return y$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
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
