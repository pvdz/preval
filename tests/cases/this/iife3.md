# Preval test case

# iife3.md

> This > Iife3
>
> From the React header

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($(1) && $(2)) {
    this;
  }
}
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  if ($(1) && $(2)) {
    null;
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  let tmpIfTest = $(1);
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$1 = $$0;
    debugger;
    tmpIfTest$1 = $(2);
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$5;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
