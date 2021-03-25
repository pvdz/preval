# Preval test case

# convert_to_func.md

> Normalize > Arrow > Convert to func
>
> Regression

#TODO

## Input

`````js filename=intro
function f(x = false) {
  const y = (s) => x;
}
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = tmpParamBare === undefined ? false : tmpParamBare;
  const y = ($$0) => {
    let s = $$0;
    debugger;
    return x;
  };
};
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let x$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    x$1 = false;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let x$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    x$2 = tmpParamBare$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$2, x$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let x$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const y$1 = function ($$0) {
      let s$1 = $$0;
      debugger;
      return x$3;
    };
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamBare, x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamBare, x, tmpIfTest);
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
