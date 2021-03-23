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
    let a$2 = $$0;
    let b$2 = $$1;
    let c$2 = $$2;
    let d$2 = $$3;
    let e$2 = $$4;
    let f$2 = $$5;
    let g$2 = $$6;
    debugger;
    const h$1 = typeof c$2;
    const i$1 = 'string' == h$1;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let a$4 = $$0;
      let b$4 = $$1;
      let c$4 = $$2;
      let d$4 = $$3;
      let e$4 = $$4;
      let f$4 = $$5;
      let g$4 = $$6;
      let h$2 = $$7;
      let i$2 = $$8;
      debugger;
      d$4 = c$4;
      c$4 = 'no';
      const tmpReturnArg = tmpBranchingC$1(a$4, b$4, c$4, d$4, e$4, f$4, g$4, h$2, i$2);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let a$5 = $$0;
      let b$5 = $$1;
      let c$5 = $$2;
      let d$5 = $$3;
      let e$5 = $$4;
      let f$5 = $$5;
      let g$5 = $$6;
      let h$3 = $$7;
      let i$3 = $$8;
      debugger;
      const j$2 = 2147483647 < c$5;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let a$7 = $$0;
        let b$7 = $$1;
        let c$7 = $$2;
        let d$7 = $$3;
        let e$7 = $$4;
        let f$7 = $$5;
        let g$7 = $$6;
        let h$5 = $$7;
        let i$5 = $$8;
        let j$3 = $$9;
        debugger;
        c$7 = 2147483647;
        const tmpReturnArg$1 = tmpBranchingC$2(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$5, i$5, j$3);
        return tmpReturnArg$1;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let a$8 = $$0;
        let b$8 = $$1;
        let c$8 = $$2;
        let d$8 = $$3;
        let e$8 = $$4;
        let f$8 = $$5;
        let g$8 = $$6;
        let h$6 = $$7;
        let i$6 = $$8;
        let j$4 = $$9;
        debugger;
        const k$3 = -2147483648 > c$8;
        const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
          let a$10 = $$0;
          let b$10 = $$1;
          let c$10 = $$2;
          let d$10 = $$3;
          let e$10 = $$4;
          let f$10 = $$5;
          let g$10 = $$6;
          let h$8 = $$7;
          let i$8 = $$8;
          let j$6 = $$9;
          let k$4 = $$10;
          debugger;
          c$10 = -2147483648;
          const tmpReturnArg$2 = tmpBranchingC$3(a$10, b$10, c$10, d$10, e$10, f$10, g$10, h$8, i$8, j$6, k$4);
          return tmpReturnArg$2;
        };
        const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
          let a$11 = $$0;
          let b$11 = $$1;
          let c$11 = $$2;
          let d$11 = $$3;
          let e$11 = $$4;
          let f$11 = $$5;
          let g$11 = $$6;
          let h$9 = $$7;
          let i$9 = $$8;
          let j$7 = $$9;
          let k$5 = $$10;
          debugger;
          const tmpReturnArg$3 = tmpBranchingC$3(a$11, b$11, c$11, d$11, e$11, f$11, g$11, h$9, i$9, j$7, k$5);
          return tmpReturnArg$3;
        };
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
          let a$12 = $$0;
          let b$12 = $$1;
          let c$12 = $$2;
          let d$12 = $$3;
          let e$12 = $$4;
          let f$12 = $$5;
          let g$12 = $$6;
          let h$10 = $$7;
          let i$10 = $$8;
          let j$8 = $$9;
          let k$6 = $$10;
          debugger;
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
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let a$9 = $$0;
        let b$9 = $$1;
        let c$9 = $$2;
        let d$9 = $$3;
        let e$9 = $$4;
        let f$9 = $$5;
        let g$9 = $$6;
        let h$7 = $$7;
        let i$7 = $$8;
        let j$5 = $$9;
        debugger;
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
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let a$6 = $$0;
      let b$6 = $$1;
      let c$6 = $$2;
      let d$6 = $$3;
      let e$6 = $$4;
      let f$6 = $$5;
      let g$6 = $$6;
      let h$4 = $$7;
      let i$4 = $$8;
      debugger;
      let l$2 = +c$6;
      const m$2 = isNaN(l$2);
      const tmpBranchingA$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let a$13 = $$0;
        let b$13 = $$1;
        let c$13 = $$2;
        let d$13 = $$3;
        let e$13 = $$4;
        let f$13 = $$5;
        let g$13 = $$6;
        let h$11 = $$7;
        let i$11 = $$8;
        let l$3 = $$9;
        let m$3 = $$10;
        debugger;
        const n$3 = a$13.length;
        l$3 = n$3 - 1;
        $(a$13, b$13, c$13, d$13, e$13, f$13, g$13, h$11, i$11, l$3, m$3);
        const tmpReturnArg$10 = tmpBranchingC$4(a$13, b$13, c$13, d$13, e$13, f$13, g$13, h$11, i$11, l$3, m$3);
        return tmpReturnArg$10;
      };
      const tmpBranchingB$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let a$14 = $$0;
        let b$14 = $$1;
        let c$14 = $$2;
        let d$14 = $$3;
        let e$14 = $$4;
        let f$14 = $$5;
        let g$14 = $$6;
        let h$12 = $$7;
        let i$12 = $$8;
        let l$4 = $$9;
        let m$4 = $$10;
        debugger;
        const tmpReturnArg$11 = tmpBranchingC$4(a$14, b$14, c$14, d$14, e$14, f$14, g$14, h$12, i$12, l$4, m$4);
        return tmpReturnArg$11;
      };
      const tmpBranchingC$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let a$15 = $$0;
        let b$15 = $$1;
        let c$15 = $$2;
        let d$15 = $$3;
        let e$15 = $$4;
        let f$15 = $$5;
        let g$15 = $$6;
        let h$13 = $$7;
        let i$13 = $$8;
        let l$5 = $$9;
        let m$5 = $$10;
        debugger;
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
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let a$3 = $$0;
    let b$3 = $$1;
    let c$3 = $$2;
    let d$3 = $$3;
    let e$3 = $$4;
    let f$3 = $$5;
    let g$3 = $$6;
    debugger;
  };
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
const l$4 = +'no';
const m$4 = isNaN(l$4);
if (m$4) {
  $('a', 'b', 'no', 'c', 'e', 1, false, 'string', true, 0, m$4);
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
