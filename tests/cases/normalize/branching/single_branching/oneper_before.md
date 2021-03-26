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
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let a$1 = $$0;
    let b$1 = $$1;
    let c$1 = $$2;
    let d$1 = $$3;
    let e$1 = $$4;
    let f$1 = $$5;
    let g$1 = $$6;
    debugger;
    return -1;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let a$3 = $$0;
    let b$3 = $$1;
    let c$3 = $$2;
    let d$3 = $$3;
    let e$3 = $$4;
    let f$3 = $$5;
    let g$3 = $$6;
    debugger;
    const h$1 = typeof c$3;
    const i$1 = 'string' == h$1;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let a$7 = $$0;
      let b$7 = $$1;
      let c$7 = $$2;
      let d$7 = $$3;
      let e$7 = $$4;
      let f$7 = $$5;
      let g$7 = $$6;
      let h$3 = $$7;
      let i$3 = $$8;
      debugger;
      d$7 = c$7;
      c$7 = 'no';
      const tmpReturnArg = tmpBranchingC$1(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$3, i$3);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let a$9 = $$0;
      let b$9 = $$1;
      let c$9 = $$2;
      let d$9 = $$3;
      let e$9 = $$4;
      let f$9 = $$5;
      let g$9 = $$6;
      let h$5 = $$7;
      let i$5 = $$8;
      debugger;
      const j$3 = 2147483647 < c$9;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let a$13 = $$0;
        let b$13 = $$1;
        let c$13 = $$2;
        let d$13 = $$3;
        let e$13 = $$4;
        let f$13 = $$5;
        let g$13 = $$6;
        let h$9 = $$7;
        let i$9 = $$8;
        let j$5 = $$9;
        debugger;
        c$13 = 2147483647;
        const tmpReturnArg$1 = tmpBranchingC$3(a$13, b$13, c$13, d$13, e$13, f$13, g$13, h$9, i$9, j$5);
        return tmpReturnArg$1;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let a$15 = $$0;
        let b$15 = $$1;
        let c$15 = $$2;
        let d$15 = $$3;
        let e$15 = $$4;
        let f$15 = $$5;
        let g$15 = $$6;
        let h$11 = $$7;
        let i$11 = $$8;
        let j$7 = $$9;
        debugger;
        const k$5 = -2147483648 > c$15;
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
          let a$19 = $$0;
          let b$19 = $$1;
          let c$19 = $$2;
          let d$19 = $$3;
          let e$19 = $$4;
          let f$19 = $$5;
          let g$19 = $$6;
          let h$15 = $$7;
          let i$15 = $$8;
          let j$11 = $$9;
          let k$7 = $$10;
          debugger;
          c$19 = -2147483648;
          const tmpReturnArg$3 = tmpBranchingC$5(a$19, b$19, c$19, d$19, e$19, f$19, g$19, h$15, i$15, j$11, k$7);
          return tmpReturnArg$3;
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
          let a$21 = $$0;
          let b$21 = $$1;
          let c$21 = $$2;
          let d$21 = $$3;
          let e$21 = $$4;
          let f$21 = $$5;
          let g$21 = $$6;
          let h$17 = $$7;
          let i$17 = $$8;
          let j$13 = $$9;
          let k$9 = $$10;
          debugger;
          const tmpReturnArg$5 = tmpBranchingC$5(a$21, b$21, c$21, d$21, e$21, f$21, g$21, h$17, i$17, j$13, k$9);
          return tmpReturnArg$5;
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
          let a$23 = $$0;
          let b$23 = $$1;
          let c$23 = $$2;
          let d$23 = $$3;
          let e$23 = $$4;
          let f$23 = $$5;
          let g$23 = $$6;
          let h$19 = $$7;
          let i$19 = $$8;
          let j$15 = $$9;
          let k$11 = $$10;
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$3(a$23, b$23, c$23, d$23, e$23, f$23, g$23, h$19, i$19, j$15);
          return tmpReturnArg$7;
        };
        if (k$5) {
          const tmpReturnArg$9 = tmpBranchingA$5(a$15, b$15, c$15, d$15, e$15, f$15, g$15, h$11, i$11, j$7, k$5);
          return tmpReturnArg$9;
        } else {
          const tmpReturnArg$11 = tmpBranchingB$5(a$15, b$15, c$15, d$15, e$15, f$15, g$15, h$11, i$11, j$7, k$5);
          return tmpReturnArg$11;
        }
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let a$17 = $$0;
        let b$17 = $$1;
        let c$17 = $$2;
        let d$17 = $$3;
        let e$17 = $$4;
        let f$17 = $$5;
        let g$17 = $$6;
        let h$13 = $$7;
        let i$13 = $$8;
        let j$9 = $$9;
        debugger;
        const tmpReturnArg$13 = tmpBranchingC$1(a$17, b$17, c$17, d$17, e$17, f$17, g$17, h$13, i$13);
        return tmpReturnArg$13;
      };
      if (j$3) {
        const tmpReturnArg$15 = tmpBranchingA$3(a$9, b$9, c$9, d$9, e$9, f$9, g$9, h$5, i$5, j$3);
        return tmpReturnArg$15;
      } else {
        const tmpReturnArg$17 = tmpBranchingB$3(a$9, b$9, c$9, d$9, e$9, f$9, g$9, h$5, i$5, j$3);
        return tmpReturnArg$17;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let a$11 = $$0;
      let b$11 = $$1;
      let c$11 = $$2;
      let d$11 = $$3;
      let e$11 = $$4;
      let f$11 = $$5;
      let g$11 = $$6;
      let h$7 = $$7;
      let i$7 = $$8;
      debugger;
      let l$3 = +c$11;
      const m$3 = isNaN(l$3);
      const tmpBranchingA$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let a$25 = $$0;
        let b$25 = $$1;
        let c$25 = $$2;
        let d$25 = $$3;
        let e$25 = $$4;
        let f$25 = $$5;
        let g$25 = $$6;
        let h$21 = $$7;
        let i$21 = $$8;
        let l$5 = $$9;
        let m$5 = $$10;
        debugger;
        const n$5 = a$25.length;
        l$5 = n$5 - 1;
        $(a$25, b$25, c$25, d$25, e$25, f$25, g$25, h$21, i$21, l$5, m$5);
        const tmpReturnArg$19 = tmpBranchingC$7(a$25, b$25, c$25, d$25, e$25, f$25, g$25, h$21, i$21, l$5, m$5);
        return tmpReturnArg$19;
      };
      const tmpBranchingB$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let a$27 = $$0;
        let b$27 = $$1;
        let c$27 = $$2;
        let d$27 = $$3;
        let e$27 = $$4;
        let f$27 = $$5;
        let g$27 = $$6;
        let h$23 = $$7;
        let i$23 = $$8;
        let l$7 = $$9;
        let m$7 = $$10;
        debugger;
        const tmpReturnArg$21 = tmpBranchingC$7(a$27, b$27, c$27, d$27, e$27, f$27, g$27, h$23, i$23, l$7, m$7);
        return tmpReturnArg$21;
      };
      const tmpBranchingC$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let a$29 = $$0;
        let b$29 = $$1;
        let c$29 = $$2;
        let d$29 = $$3;
        let e$29 = $$4;
        let f$29 = $$5;
        let g$29 = $$6;
        let h$25 = $$7;
        let i$25 = $$8;
        let l$9 = $$9;
        let m$9 = $$10;
        debugger;
        const tmpReturnArg$23 = tmpBranchingC(a$29, b$29, c$29, d$29, e$29, f$29, g$29);
        return tmpReturnArg$23;
      };
      if (m$3) {
        const tmpReturnArg$25 = tmpBranchingA$7(a$11, b$11, c$11, d$11, e$11, f$11, g$11, h$7, i$7, l$3, m$3);
        return tmpReturnArg$25;
      } else {
        const tmpReturnArg$27 = tmpBranchingB$7(a$11, b$11, c$11, d$11, e$11, f$11, g$11, h$7, i$7, l$3, m$3);
        return tmpReturnArg$27;
      }
    };
    if (i$1) {
      const tmpReturnArg$29 = tmpBranchingA$1(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$1, i$1);
      return tmpReturnArg$29;
    } else {
      const tmpReturnArg$31 = tmpBranchingB$1(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$1, i$1);
      return tmpReturnArg$31;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let a$5 = $$0;
    let b$5 = $$1;
    let c$5 = $$2;
    let d$5 = $$3;
    let e$5 = $$4;
    let f$5 = $$5;
    let g$5 = $$6;
    debugger;
  };
  if (g) {
    const tmpReturnArg$33 = tmpBranchingA(a, b, c, d, e, f, g);
    return tmpReturnArg$33;
  } else {
    const tmpReturnArg$35 = tmpBranchingB(a, b, c, d, e, f, g);
    return tmpReturnArg$35;
  }
};
X('a', 'b', 'c', 'd', 'e');
`````

## Output

`````js filename=intro
const l$6 = +'no';
const m$6 = isNaN(l$6);
if (m$6) {
  $('a', 'b', 'no', 'c', 'e', 1, false, 'string', true, 0, m$6);
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
