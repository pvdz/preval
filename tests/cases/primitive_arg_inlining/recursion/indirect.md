# Preval test case

# indirect.md

> Primitive arg inlining > Recursion > Indirect
>
> Recursion problems

#TODO

## Input

`````js filename=intro
function f(n) {
  return g(n);
}
function g(n) {
  return h(n+1);
}
function h(n) {
  if ($(n) > 1000) return n;
  return f(n);
}
$(f(0));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  return g(n);
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  return h(n$1 + 1);
};
let h = function ($$0) {
  let n$3 = $$0;
  debugger;
  if ($(n$3) > 1000) return n$3;
  return f(n$3);
};
$(f(0));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  const tmpReturnArg = g(n);
  return tmpReturnArg;
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  const tmpCallCallee = h;
  const tmpCalleeParam = n$1 + 1;
  const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg$1;
};
let h = function ($$0) {
  let n$3 = $$0;
  debugger;
  const tmpBinLhs = $(n$3);
  const tmpIfTest = tmpBinLhs > 1000;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let n$2 = $$0;
    let tmpBinLhs$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    return n$2;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let n$4 = $$0;
    let tmpBinLhs$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(n$4, tmpBinLhs$3, tmpIfTest$3);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let n$6 = $$0;
    let tmpBinLhs$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    const tmpReturnArg$5 = f(n$6);
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(n$3, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(n$3, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$9;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(0);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const $clone$g$0_D0 = function () {
  debugger;
  const tmpBinLhs$1 = $(1);
  const tmpIfTest$1 = tmpBinLhs$1 > 1000;
  if (tmpIfTest$1) {
    return 1;
  } else {
    const tmpReturnArg$4 = $clone$g$0_D1();
    return tmpReturnArg$4;
  }
};
const $clone$g$0_D1 = function () {
  debugger;
  const tmpBinLhs$2 = $(2);
  const tmpIfTest$2 = tmpBinLhs$2 > 1000;
  if (tmpIfTest$2) {
    return 2;
  } else {
    const tmpReturnArg$1 = $clone$g$0_D2();
    return tmpReturnArg$1;
  }
};
const $clone$g$0_D2 = function () {
  debugger;
  const tmpBinLhs$3 = $(3);
  const tmpIfTest$3 = tmpBinLhs$3 > 1000;
  if (tmpIfTest$3) {
    return 3;
  } else {
    const tmpReturnArg$2 = $clone$g$0_D3();
    return tmpReturnArg$2;
  }
};
const $clone$g$0_D3 = function () {
  debugger;
  const tmpBinLhs$4 = $(4);
  const tmpIfTest$4 = tmpBinLhs$4 > 1000;
  if (tmpIfTest$4) {
    return 4;
  } else {
    const tmpReturnArg$3 = $clone$g$0_D4();
    return tmpReturnArg$3;
  }
};
const $clone$g$0_D4 = function () {
  debugger;
  const tmpBinLhs$5 = $(5);
  const tmpIfTest$5 = tmpBinLhs$5 > 1000;
  if (tmpIfTest$5) {
    return 5;
  } else {
    const tmpReturnArg$5 = $clone$g$0_D5();
    return tmpReturnArg$5;
  }
};
const $clone$g$0_D5 = function () {
  debugger;
  const tmpBinLhs$6 = $(6);
  const tmpIfTest$6 = tmpBinLhs$6 > 1000;
  if (tmpIfTest$6) {
    return 6;
  } else {
    const tmpReturnArg$6 = $clone$g$0_D6();
    return tmpReturnArg$6;
  }
};
const $clone$g$0_D6 = function () {
  debugger;
  const tmpBinLhs$7 = $(7);
  const tmpIfTest$7 = tmpBinLhs$7 > 1000;
  if (tmpIfTest$7) {
    return 7;
  } else {
    const tmpReturnArg$7 = $clone$g$0_D7();
    return tmpReturnArg$7;
  }
};
const $clone$g$0_D7 = function () {
  debugger;
  const tmpBinLhs$8 = $(8);
  const tmpIfTest$8 = tmpBinLhs$8 > 1000;
  if (tmpIfTest$8) {
    return 8;
  } else {
    const tmpReturnArg$8 = $clone$g$0_D8();
    return tmpReturnArg$8;
  }
};
const $clone$g$0_D8 = function () {
  debugger;
  const tmpBinLhs$9 = $(9);
  const tmpIfTest$9 = tmpBinLhs$9 > 1000;
  if (tmpIfTest$9) {
    return 9;
  } else {
    const tmpReturnArg$9 = $clone$g$0_D9();
    return tmpReturnArg$9;
  }
};
const $clone$g$0_D9 = function () {
  debugger;
  const tmpBinLhs$10 = $(10);
  const tmpIfTest$10 = tmpBinLhs$10 > 1000;
  if (tmpIfTest$10) {
    return 10;
  } else {
    const tmpReturnArg$11 = g(10);
    return tmpReturnArg$11;
  }
};
const g = function ($$0) {
  const n$1 = $$0;
  debugger;
  const tmpCalleeParam = n$1 + 1;
  const tmpBinLhs = $(tmpCalleeParam);
  const tmpIfTest = tmpBinLhs > 1000;
  if (tmpIfTest) {
    return tmpCalleeParam;
  } else {
    const tmpReturnArg$10 = g(tmpCalleeParam);
    return tmpReturnArg$10;
  }
};
const tmpCalleeParam$1 = $clone$g$0_D0();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 11
 - 12: 12
 - 13: 13
 - 14: 14
 - 15: 15
 - 16: 16
 - 17: 17
 - 18: 18
 - 19: 19
 - 20: 20
 - 21: 21
 - 22: 22
 - 23: 23
 - 24: 24
 - 25: 25
 - 26: 26
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
