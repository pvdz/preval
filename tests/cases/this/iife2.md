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
  const tmpBranchingA = function () {
    debugger;
    const tmpBinLhs$1 = 'undefined';
    const tmpIfTest$3 = tmpBinLhs$1 !== 'undefined';
    const tmpBranchingA$1 = function () {
      debugger;
      g = tmpthis;
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
f();
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
