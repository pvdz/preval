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
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpBinLhs$1 = typeof window;
    const tmpIfTest$3 = tmpBinLhs$1 !== 'undefined';
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpthis$4 = $$0;
      let g$4 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpBinLhs$2 = $$3;
      let tmpIfTest$7 = $$4;
      debugger;
      g$4 = tmpthis$4;
      const tmpReturnArg = tmpBranchingC$1(tmpthis$4, g$4, tmpIfTest$6, tmpBinLhs$2, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpthis$5 = $$0;
      let g$5 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpBinLhs$3 = $$3;
      let tmpIfTest$9 = $$4;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpthis$5, g$5, tmpIfTest$8, tmpBinLhs$3, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpthis$6 = $$0;
      let g$6 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpBinLhs$4 = $$3;
      let tmpIfTest$11 = $$4;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC(tmpthis$6, g$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpthis$1, g$1, tmpIfTest$2, tmpBinLhs$1, tmpIfTest$3);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpthis$1, g$1, tmpIfTest$2, tmpBinLhs$1, tmpIfTest$3);
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpthis$2 = $$0;
    let g$2 = $$1;
    let tmpIfTest$4 = $$2;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpthis$2, g$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpthis$3 = $$0;
    let g$3 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpthis, g, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpthis, g, tmpIfTest);
    return tmpReturnArg$7;
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
  const tmpIfTest$3 = tmpBinLhs$1 !== 'undefined';
  if (tmpIfTest$3) {
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
