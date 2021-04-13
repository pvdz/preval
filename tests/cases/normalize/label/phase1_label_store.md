# Preval test case

# phase1_label_store.md

> Normalize > Label > Phase1 label store
>
> Regression

This is a minimal test case that somehow uncovered that the label store was not properly set in phase1 (only in prepare).

## Input

`````js filename=intro
const f = function (x) {
  while (1) {
    let t = 1;
    if (3 === s) t = 0;
    stop: {
      break stop;
    }
  }
  x + 1;
};
f();
f();
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  while (1) {
    let t = 1;
    if (3 === s) t = 0;
    stop: {
      break stop;
    }
  }
  x + 1;
};
f();
f();
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    let t = 1;
    const tmpIfTest = 3 === s;
    const tmpBranchingA = function () {
      debugger;
      t = 0;
      const tmpReturnArg = tmpBranchingC();
      return tmpReturnArg;
    };
    const tmpBranchingB = function () {
      debugger;
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    };
    const tmpBranchingC = function () {
      debugger;
      return undefined;
    };
    if (tmpIfTest) {
      const tmpReturnArg$3 = tmpBranchingA();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB();
      return tmpReturnArg$5;
    }
  };
  let tmpLoopTail = function ($$0, $$1) {
    let tmpLoopRetCode$1 = $$0;
    let tmpLoopRetValue$1 = $$1;
    debugger;
    const tmpIfTest$1 = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest$1) {
      return tmpLoopRetValue$1;
    } else {
      x + 1;
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
  const tmpReturnArg$7 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg$7;
};
f();
f();
`````

## Output

`````js filename=intro
const tmpLoopBody = function () {
  debugger;
  const tmpIfTest = 3 === s;
  if (tmpIfTest) {
    return undefined;
  } else {
    return undefined;
  }
};
const $clone$f$0_Iundefined = function () {
  debugger;
  while (true) {
    tmpLoopBody();
  }
  return undefined;
};
$clone$f$0_Iundefined();
$clone$f$0_Iundefined();
`````

## Globals

BAD@! Found 1 implicit global bindings:

s

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
