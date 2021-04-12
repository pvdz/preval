# Preval test case

# oneper_before.md

> Normalize > Branching > Single branching > Oneper before
>
> One branch per func?

#TODO

This is the example input

The test is what that would roughly translate to for single branching functions

## Input

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const h = typeof c;
    const i = 'string' == h;
    if (i) {
      d = c;
      c = 'no';
    } else {
      const j = 2147483647 < c;
      if (j) {
        c = 2147483647;
      } else {
        const k = -2147483648 > c;
        if (k) {
          c = -2147483648;
        }
      }
    }
    let l = +c;
    const m = isNaN(l);
    if (m) {
      const n = a.length;
      l = n - 1;
      $(a, b, c, d, e, f, g, h, i, l, m);
    }
  }
}
X('a', 'b', 'c', 'd', 'e');
`````

## Pre Normal

`````js filename=intro
const X = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const h = typeof c;
    const i = 'string' == h;
    if (i) {
      d = c;
      c = 'no';
    } else {
      const j = 2147483647 < c;
      if (j) {
        c = 2147483647;
      } else {
        const k = -2147483648 > c;
        if (k) {
          c = -2147483648;
        }
      }
    }
    let l = +c;
    const m = isNaN(l);
    if (m) {
      const n = a.length;
      l = n - 1;
      $(a, b, c, d, e, f, g, h, i, l, m);
    }
  }
};
X('a', 'b', 'c', 'd', 'e');
`````

## Normalized

`````js filename=intro
const X = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const f = a.length;
  const g = 0 === f;
  const tmpBranchingA = function () {
    debugger;
    return -1;
  };
  const tmpBranchingB = function () {
    debugger;
    const h$1 = typeof c;
    const i$1 = 'string' == h$1;
    const tmpBranchingA$1 = function () {
      debugger;
      d = c;
      c = 'no';
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const j$3 = 2147483647 < c;
      const tmpBranchingA$3 = function () {
        debugger;
        c = 2147483647;
        const tmpReturnArg$1 = tmpBranchingC$3();
        return tmpReturnArg$1;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const k$5 = -2147483648 > c;
        const tmpBranchingA$5 = function () {
          debugger;
          c = -2147483648;
          const tmpReturnArg$3 = tmpBranchingC$5();
          return tmpReturnArg$3;
        };
        const tmpBranchingB$5 = function () {
          debugger;
          const tmpReturnArg$5 = tmpBranchingC$5();
          return tmpReturnArg$5;
        };
        const tmpBranchingC$5 = function () {
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$3();
          return tmpReturnArg$7;
        };
        if (k$5) {
          const tmpReturnArg$9 = tmpBranchingA$5();
          return tmpReturnArg$9;
        } else {
          const tmpReturnArg$11 = tmpBranchingB$5();
          return tmpReturnArg$11;
        }
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$13 = tmpBranchingC$1();
        return tmpReturnArg$13;
      };
      if (j$3) {
        const tmpReturnArg$15 = tmpBranchingA$3();
        return tmpReturnArg$15;
      } else {
        const tmpReturnArg$17 = tmpBranchingB$3();
        return tmpReturnArg$17;
      }
    };
    const tmpBranchingC$1 = function () {
      debugger;
      l$1 = +c;
      m$1 = isNaN(l$1);
      const tmpBranchingA$7 = function () {
        debugger;
        const n$5 = a.length;
        l$1 = n$5 - 1;
        $(a, b, c, d, e, f, g, h$1, i$1, l$1, m$1);
        const tmpReturnArg$19 = tmpBranchingC$7();
        return tmpReturnArg$19;
      };
      const tmpBranchingB$7 = function () {
        debugger;
        const tmpReturnArg$21 = tmpBranchingC$7();
        return tmpReturnArg$21;
      };
      const tmpBranchingC$7 = function () {
        debugger;
        const tmpReturnArg$23 = tmpBranchingC();
        return tmpReturnArg$23;
      };
      if (m$1) {
        const tmpReturnArg$25 = tmpBranchingA$7();
        return tmpReturnArg$25;
      } else {
        const tmpReturnArg$27 = tmpBranchingB$7();
        return tmpReturnArg$27;
      }
    };
    let l$1 = undefined;
    let m$1 = undefined;
    if (i$1) {
      const tmpReturnArg$29 = tmpBranchingA$1();
      return tmpReturnArg$29;
    } else {
      const tmpReturnArg$31 = tmpBranchingB$1();
      return tmpReturnArg$31;
    }
  };
  const tmpBranchingC = function () {
    debugger;
  };
  if (g) {
    const tmpReturnArg$33 = tmpBranchingA();
    return tmpReturnArg$33;
  } else {
    const tmpReturnArg$35 = tmpBranchingB();
    return tmpReturnArg$35;
  }
};
X('a', 'b', 'c', 'd', 'e');
`````

## Output

`````js filename=intro
let c = 'c';
let d = 'd';
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
  tmpBranchingC$1();
} else {
  tmpBranchingB$1();
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
