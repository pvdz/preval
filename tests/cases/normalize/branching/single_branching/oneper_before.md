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
};
X('a', 'b', 'c', 'd', 'e');
`````

## Normalized

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  const tmpBranchingA = function (a$1, b$1, c$1, d$1, e$1, f$1, g$1) {
    return -1;
  };
  const tmpBranchingB = function (a$2, b$2, c$2, d$2, e$2, f$2, g$2) {
    const h$1 = typeof c$2;
    const i$1 = 'string' == h$1;
    const tmpBranchingA$1 = function (a$4, b$4, c$4, d$4, e$4, f$4, g$4, h$2, i$2) {
      d$4 = c$4;
      c$4 = 'no';
      const tmpReturnArg = tmpBranchingC$1(a$4, b$4, c$4, d$4, e$4, f$4, g$4, h$2, i$2);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$3, i$3) {
      const j$2 = 2147483647 < c$5;
      const tmpBranchingA$2 = function (a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$5, i$5, j$3) {
        c$7 = 2147483647;
        const tmpReturnArg$1 = tmpBranchingC$2(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$5, i$5, j$3);
        return tmpReturnArg$1;
      };
      const tmpBranchingB$2 = function (a$8, b$8, c$8, d$8, e$8, f$8, g$8, h$6, i$6, j$4) {
        const k$3 = -2147483648 > c$8;
        const tmpBranchingA$3 = function (a$10, b$10, c$10, d$10, e$10, f$10, g$10, h$8, i$8, j$6, k$4) {
          c$10 = -2147483648;
          const tmpReturnArg$2 = tmpBranchingC$3(a$10, b$10, c$10, d$10, e$10, f$10, g$10, h$8, i$8, j$6, k$4);
          return tmpReturnArg$2;
        };
        const tmpBranchingB$3 = function (a$11, b$11, c$11, d$11, e$11, f$11, g$11, h$9, i$9, j$7, k$5) {
          const tmpReturnArg$3 = tmpBranchingC$3(a$11, b$11, c$11, d$11, e$11, f$11, g$11, h$9, i$9, j$7, k$5);
          return tmpReturnArg$3;
        };
        const tmpBranchingC$3 = function (a$12, b$12, c$12, d$12, e$12, f$12, g$12, h$10, i$10, j$8, k$6) {
          const tmpReturnArg$4 = tmpBranchingC$2(a$12, b$12, c$12, d$12, e$12, f$12, g$12, h$10, i$10, j$8);
          return tmpReturnArg$4;
        };
        if (k$3) {
          const tmpReturnArg$5 = tmpBranchingA$3(a$8, b$8, c$8, d$8, e$8, f$8, g$8, h$6, i$6, j$4, k$3);
          return tmpReturnArg$5;
        } else {
          const tmpReturnArg$6 = tmpBranchingB$3(a$8, b$8, c$8, d$8, e$8, f$8, g$8, h$6, i$6, j$4, k$3);
          return tmpReturnArg$6;
        }
      };
      const tmpBranchingC$2 = function (a$9, b$9, c$9, d$9, e$9, f$9, g$9, h$7, i$7, j$5) {
        const tmpReturnArg$7 = tmpBranchingC$1(a$9, b$9, c$9, d$9, e$9, f$9, g$9, h$7, i$7);
        return tmpReturnArg$7;
      };
      if (j$2) {
        const tmpReturnArg$8 = tmpBranchingA$2(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$3, i$3, j$2);
        return tmpReturnArg$8;
      } else {
        const tmpReturnArg$9 = tmpBranchingB$2(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$3, i$3, j$2);
        return tmpReturnArg$9;
      }
    };
    const tmpBranchingC$1 = function (a$6, b$6, c$6, d$6, e$6, f$6, g$6, h$4, i$4) {
      let l$2 = +c$6;
      const m$2 = isNaN(l$2);
      const tmpBranchingA$4 = function (a$13, b$13, c$13, d$13, e$13, f$13, g$13, h$11, i$11, l$3, m$3) {
        const n$3 = a$13.length;
        l$3 = n$3 - 1;
        $(a$13, b$13, c$13, d$13, e$13, f$13, g$13, h$11, i$11, l$3, m$3);
        const tmpReturnArg$10 = tmpBranchingC$4(a$13, b$13, c$13, d$13, e$13, f$13, g$13, h$11, i$11, l$3, m$3);
        return tmpReturnArg$10;
      };
      const tmpBranchingB$4 = function (a$14, b$14, c$14, d$14, e$14, f$14, g$14, h$12, i$12, l$4, m$4) {
        const tmpReturnArg$11 = tmpBranchingC$4(a$14, b$14, c$14, d$14, e$14, f$14, g$14, h$12, i$12, l$4, m$4);
        return tmpReturnArg$11;
      };
      const tmpBranchingC$4 = function (a$15, b$15, c$15, d$15, e$15, f$15, g$15, h$13, i$13, l$5, m$5) {
        const tmpReturnArg$12 = tmpBranchingC(a$15, b$15, c$15, d$15, e$15, f$15, g$15);
        return tmpReturnArg$12;
      };
      if (m$2) {
        const tmpReturnArg$13 = tmpBranchingA$4(a$6, b$6, c$6, d$6, e$6, f$6, g$6, h$4, i$4, l$2, m$2);
        return tmpReturnArg$13;
      } else {
        const tmpReturnArg$14 = tmpBranchingB$4(a$6, b$6, c$6, d$6, e$6, f$6, g$6, h$4, i$4, l$2, m$2);
        return tmpReturnArg$14;
      }
    };
    if (i$1) {
      const tmpReturnArg$15 = tmpBranchingA$1(a$2, b$2, c$2, d$2, e$2, f$2, g$2, h$1, i$1);
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$16 = tmpBranchingB$1(a$2, b$2, c$2, d$2, e$2, f$2, g$2, h$1, i$1);
      return tmpReturnArg$16;
    }
  };
  const tmpBranchingC = function (a$3, b$3, c$3, d$3, e$3, f$3, g$3) {};
  if (g) {
    const tmpReturnArg$17 = tmpBranchingA(a, b, c, d, e, f, g);
    return tmpReturnArg$17;
  } else {
    const tmpReturnArg$18 = tmpBranchingB(a, b, c, d, e, f, g);
    return tmpReturnArg$18;
  }
};
X('a', 'b', 'c', 'd', 'e');
`````

## Output

`````js filename=intro
const l$2 = +'no';
const m$2 = isNaN(l$2);
if (m$2) {
  $('a', 'b', 'no', 'c', 'e', 1, false, 'string', true, 0, m$2);
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
