# Preval test case

# oneper_before2.md

> Normalize > Branching > Single branching > Oneper before2
>
> One branch per func?

#TODO

This is the example input

The test is what that would roughly translate to for single branching functions

## Input

`````js filename=intro
let c = 'c';
let d = 'd';
const tmpBranchingB = function () {
  const tmpBranchingB$3 = function () {
    const k$5 = -2147483648 > c;
    if (k$5) {
      c = -2147483648;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$11 = tmpBranchingC$1();
      return tmpReturnArg$11;
    }
  };
  const h$1 = typeof c;
  const i$1 = 'string' == h$1;
  const tmpBranchingB$1 = function () {
    const j$3 = 2147483647 < c;
    if (j$3) {
      c = 2147483647;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$3();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC$1 = function () {
    l$1 = +c;
    m$1 = isNaN(l$1);
    if (m$1) {
      l$1 = 0;
      $('a', 'b', c, d, 'e', 1, false, h$1, i$1, l$1, m$1);
      return undefined;
    } else {
      return undefined;
    }
  };
  let l$1 = undefined;
  let m$1 = undefined;
  if (i$1) {
    d = c;
    c = 'no';
    const tmpReturnArg = tmpBranchingC$1();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$31 = tmpBranchingB$1();
    return tmpReturnArg$31;
  }
};
tmpBranchingB();

`````

## Pre Normal

`````js filename=intro
let c = 'c';
let d = 'd';
const tmpBranchingB = function () {
  debugger;
  const tmpBranchingB$3 = function () {
    debugger;
    const k$5 = -2147483648 > c;
    if (k$5) {
      c = -2147483648;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$11 = tmpBranchingC$1();
      return tmpReturnArg$11;
    }
  };
  const h$1 = typeof c;
  const i$1 = 'string' == h$1;
  const tmpBranchingB$1 = function () {
    debugger;
    const j$3 = 2147483647 < c;
    if (j$3) {
      c = 2147483647;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$3();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC$1 = function () {
    debugger;
    l$1 = +c;
    m$1 = isNaN(l$1);
    if (m$1) {
      l$1 = 0;
      $('a', 'b', c, d, 'e', 1, false, h$1, i$1, l$1, m$1);
      return undefined;
    } else {
      return undefined;
    }
  };
  let l$1 = undefined;
  let m$1 = undefined;
  if (i$1) {
    d = c;
    c = 'no';
    const tmpReturnArg = tmpBranchingC$1();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$31 = tmpBranchingB$1();
    return tmpReturnArg$31;
  }
};
tmpBranchingB();
`````

## Normalized

`````js filename=intro
let c = 'c';
let d = 'd';
const tmpBranchingB = function () {
  debugger;
  const tmpBranchingB$3 = function () {
    debugger;
    const k$5 = -2147483648 > c;
    if (k$5) {
      c = -2147483648;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$11 = tmpBranchingC$1();
      return tmpReturnArg$11;
    }
  };
  const h$1 = typeof c;
  const i$1 = 'string' == h$1;
  const tmpBranchingB$1 = function () {
    debugger;
    const j$3 = 2147483647 < c;
    if (j$3) {
      c = 2147483647;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$3();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC$1 = function () {
    debugger;
    l$1 = +c;
    m$1 = isNaN(l$1);
    if (m$1) {
      l$1 = 0;
      $('a', 'b', c, d, 'e', 1, false, h$1, i$1, l$1, m$1);
      return undefined;
    } else {
      return undefined;
    }
  };
  let l$1 = undefined;
  let m$1 = undefined;
  if (i$1) {
    d = c;
    c = 'no';
    const tmpReturnArg = tmpBranchingC$1();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$31 = tmpBranchingB$1();
    return tmpReturnArg$31;
  }
};
tmpBranchingB();
`````

## Output

`````js filename=intro
const tmpssa2_l$1 = +'no';
const tmpssa3_m$1 = isNaN(tmpssa2_l$1);
if (tmpssa3_m$1) {
  $('a', 'b', 'no', 'c', 'e', 1, false, 'string', true, 0, tmpssa3_m$1);
} else {
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

isNaN

## Result

Should call `$` with:
 - 1: 'a', 'b', 'no', 'c', 'e', 1, false, 'string', true, 0, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
