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
  if ($(1) && $(2)) {
    this;
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  let tmpIfTest = $(1);
  const tmpBranchingA = function (tmpIfTest$1) {
    tmpIfTest$1 = $(2);
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpIfTest$3) {};
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$3;
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
