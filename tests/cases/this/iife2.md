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
  let g = undefined;
  if ($(1)) {
    if (typeof window !== 'undefined') {
      g = this;
    }
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  let g = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpPrevalAliasThis$1, g$1, tmpIfTest$2) {
    const tmpBinLhs$1 = typeof window;
    const tmpIfTest$3 = tmpBinLhs$1 !== 'undefined';
    const tmpBranchingA$1 = function (tmpPrevalAliasThis$4, g$4, tmpIfTest$6, tmpBinLhs$2, tmpIfTest$7) {
      g$4 = tmpPrevalAliasThis$4;
      const tmpReturnArg = tmpBranchingC$1(tmpPrevalAliasThis$4, g$4, tmpIfTest$6, tmpBinLhs$2, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpPrevalAliasThis$5, g$5, tmpIfTest$8, tmpBinLhs$3, tmpIfTest$9) {
      const tmpReturnArg$1 = tmpBranchingC$1(tmpPrevalAliasThis$5, g$5, tmpIfTest$8, tmpBinLhs$3, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpPrevalAliasThis$6, g$6, tmpIfTest$10, tmpBinLhs$4, tmpIfTest$11) {
      const tmpReturnArg$2 = tmpBranchingC(tmpPrevalAliasThis$6, g$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpPrevalAliasThis$1, g$1, tmpIfTest$2, tmpBinLhs$1, tmpIfTest$3);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpPrevalAliasThis$1, g$1, tmpIfTest$2, tmpBinLhs$1, tmpIfTest$3);
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpPrevalAliasThis$2, g$2, tmpIfTest$4) {
    const tmpReturnArg$5 = tmpBranchingC(tmpPrevalAliasThis$2, g$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpPrevalAliasThis$3, g$3, tmpIfTest$5) {};
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpPrevalAliasThis, g, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpPrevalAliasThis, g, tmpIfTest);
    return tmpReturnArg$7;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
const tmpBranchingA = function () {
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
