# Preval test case

# iife2.md

> This > Iife2
>
> From the React header

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($(1)) {
    var g;
    if (typeof window !== 'undefined') {
      g = this;
    }
  }
}
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  let g = undefined;
  if ($(1)) {
    if (typeof window !== 'undefined') {
      g = tmpthis;
    }
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  let g = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpthis$1 = $$0;
    let g$1 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpBinLhs$1 = typeof window;
    const tmpIfTest$5 = tmpBinLhs$1 !== 'undefined';
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpthis$7 = $$0;
      let g$7 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpBinLhs$3 = $$3;
      let tmpIfTest$13 = $$4;
      debugger;
      g$7 = tmpthis$7;
      const tmpReturnArg = tmpBranchingC$1(tmpthis$7, g$7, tmpIfTest$11, tmpBinLhs$3, tmpIfTest$13);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpthis$9 = $$0;
      let g$9 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpBinLhs$5 = $$3;
      let tmpIfTest$17 = $$4;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpthis$9, g$9, tmpIfTest$15, tmpBinLhs$5, tmpIfTest$17);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpthis$11 = $$0;
      let g$11 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpBinLhs$7 = $$3;
      let tmpIfTest$21 = $$4;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpthis$11, g$11, tmpIfTest$19);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpthis$1, g$1, tmpIfTest$3, tmpBinLhs$1, tmpIfTest$5);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpthis$1, g$1, tmpIfTest$3, tmpBinLhs$1, tmpIfTest$5);
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpthis$3 = $$0;
    let g$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(tmpthis$3, g$3, tmpIfTest$7);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpthis$5 = $$0;
    let g$5 = $$1;
    let tmpIfTest$9 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpthis, g, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpthis, g, tmpIfTest);
    return tmpReturnArg$13;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
const tmpBranchingA = function () {
  debugger;
  const tmpBinLhs$1 = typeof window;
  const tmpIfTest$5 = tmpBinLhs$1 !== 'undefined';
  if (tmpIfTest$5) {
    return undefined;
  } else {
    return undefined;
  }
};
if (tmpIfTest) {
  tmpBranchingA();
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

window

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
