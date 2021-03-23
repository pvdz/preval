# Preval test case

# early_return_with_tail.md

> Normalize > Switch > Early return with tail
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(7)) {
    case 0:
      $(2);
      break;
    case $(1):
      $(3);
    case $(4):
      $(5);
      return $(6);
    case $(7):
      break;
  }
  $('after');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(7);
    let tmpSwitchCaseToStart = 4;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if ($(4) === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else if ($(7) === tmpSwitchValue) tmpSwitchCaseToStart = 3;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(2);
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 1) {
        $(3);
      }
      if (tmpSwitchCaseToStart <= 2) {
        $(5);
        return $(6);
      }
      if (tmpSwitchCaseToStart <= 3) {
        break tmpSwitchBreak;
      }
    }
  }
  $('after');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(7);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpIfTest$4 = $$2;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$4);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpSwitchValue$2 = $$0;
    let tmpSwitchCaseToStart$2 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$6 = tmpBinLhs$3 === tmpSwitchValue$2;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$4 = $$0;
      let tmpSwitchCaseToStart$4 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpBinLhs$6 = $$3;
      let tmpIfTest$11 = $$4;
      debugger;
      tmpSwitchCaseToStart$4 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$10, tmpBinLhs$6, tmpIfTest$11);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$5 = $$0;
      let tmpSwitchCaseToStart$5 = $$1;
      let tmpIfTest$12 = $$2;
      let tmpBinLhs$7 = $$3;
      let tmpIfTest$13 = $$4;
      debugger;
      const tmpBinLhs$8 = $(4);
      const tmpIfTest$14 = tmpBinLhs$8 === tmpSwitchValue$5;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$7 = $$0;
        let tmpSwitchCaseToStart$7 = $$1;
        let tmpIfTest$18 = $$2;
        let tmpBinLhs$11 = $$3;
        let tmpIfTest$19 = $$4;
        let tmpBinLhs$12 = $$5;
        let tmpIfTest$20 = $$6;
        debugger;
        tmpSwitchCaseToStart$7 = 2;
        const tmpReturnArg$2 = tmpBranchingC$2(
          tmpSwitchValue$7,
          tmpSwitchCaseToStart$7,
          tmpIfTest$18,
          tmpBinLhs$11,
          tmpIfTest$19,
          tmpBinLhs$12,
          tmpIfTest$20,
        );
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$8 = $$0;
        let tmpSwitchCaseToStart$8 = $$1;
        let tmpIfTest$21 = $$2;
        let tmpBinLhs$13 = $$3;
        let tmpIfTest$22 = $$4;
        let tmpBinLhs$14 = $$5;
        let tmpIfTest$23 = $$6;
        debugger;
        const tmpBinLhs$15 = $(7);
        const tmpIfTest$24 = tmpBinLhs$15 === tmpSwitchValue$8;
        const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$10 = $$0;
          let tmpSwitchCaseToStart$10 = $$1;
          let tmpIfTest$28 = $$2;
          let tmpBinLhs$18 = $$3;
          let tmpIfTest$29 = $$4;
          let tmpBinLhs$19 = $$5;
          let tmpIfTest$30 = $$6;
          let tmpBinLhs$20 = $$7;
          let tmpIfTest$31 = $$8;
          debugger;
          tmpSwitchCaseToStart$10 = 3;
          const tmpReturnArg$3 = tmpBranchingC$3(
            tmpSwitchValue$10,
            tmpSwitchCaseToStart$10,
            tmpIfTest$28,
            tmpBinLhs$18,
            tmpIfTest$29,
            tmpBinLhs$19,
            tmpIfTest$30,
            tmpBinLhs$20,
            tmpIfTest$31,
          );
          return tmpReturnArg$3;
        };
        const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$11 = $$0;
          let tmpSwitchCaseToStart$11 = $$1;
          let tmpIfTest$32 = $$2;
          let tmpBinLhs$21 = $$3;
          let tmpIfTest$33 = $$4;
          let tmpBinLhs$22 = $$5;
          let tmpIfTest$34 = $$6;
          let tmpBinLhs$23 = $$7;
          let tmpIfTest$35 = $$8;
          debugger;
          const tmpReturnArg$4 = tmpBranchingC$3(
            tmpSwitchValue$11,
            tmpSwitchCaseToStart$11,
            tmpIfTest$32,
            tmpBinLhs$21,
            tmpIfTest$33,
            tmpBinLhs$22,
            tmpIfTest$34,
            tmpBinLhs$23,
            tmpIfTest$35,
          );
          return tmpReturnArg$4;
        };
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$12 = $$0;
          let tmpSwitchCaseToStart$12 = $$1;
          let tmpIfTest$36 = $$2;
          let tmpBinLhs$24 = $$3;
          let tmpIfTest$37 = $$4;
          let tmpBinLhs$25 = $$5;
          let tmpIfTest$38 = $$6;
          let tmpBinLhs$26 = $$7;
          let tmpIfTest$39 = $$8;
          debugger;
          const tmpReturnArg$5 = tmpBranchingC$2(
            tmpSwitchValue$12,
            tmpSwitchCaseToStart$12,
            tmpIfTest$36,
            tmpBinLhs$24,
            tmpIfTest$37,
            tmpBinLhs$25,
            tmpIfTest$38,
          );
          return tmpReturnArg$5;
        };
        if (tmpIfTest$24) {
          const tmpReturnArg$6 = tmpBranchingA$3(
            tmpSwitchValue$8,
            tmpSwitchCaseToStart$8,
            tmpIfTest$21,
            tmpBinLhs$13,
            tmpIfTest$22,
            tmpBinLhs$14,
            tmpIfTest$23,
            tmpBinLhs$15,
            tmpIfTest$24,
          );
          return tmpReturnArg$6;
        } else {
          const tmpReturnArg$7 = tmpBranchingB$3(
            tmpSwitchValue$8,
            tmpSwitchCaseToStart$8,
            tmpIfTest$21,
            tmpBinLhs$13,
            tmpIfTest$22,
            tmpBinLhs$14,
            tmpIfTest$23,
            tmpBinLhs$15,
            tmpIfTest$24,
          );
          return tmpReturnArg$7;
        }
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$9 = $$0;
        let tmpSwitchCaseToStart$9 = $$1;
        let tmpIfTest$25 = $$2;
        let tmpBinLhs$16 = $$3;
        let tmpIfTest$26 = $$4;
        let tmpBinLhs$17 = $$5;
        let tmpIfTest$27 = $$6;
        debugger;
        const tmpReturnArg$8 = tmpBranchingC$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$25, tmpBinLhs$16, tmpIfTest$26);
        return tmpReturnArg$8;
      };
      if (tmpIfTest$14) {
        const tmpReturnArg$9 = tmpBranchingA$2(
          tmpSwitchValue$5,
          tmpSwitchCaseToStart$5,
          tmpIfTest$12,
          tmpBinLhs$7,
          tmpIfTest$13,
          tmpBinLhs$8,
          tmpIfTest$14,
        );
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$10 = tmpBranchingB$2(
          tmpSwitchValue$5,
          tmpSwitchCaseToStart$5,
          tmpIfTest$12,
          tmpBinLhs$7,
          tmpIfTest$13,
          tmpBinLhs$8,
          tmpIfTest$14,
        );
        return tmpReturnArg$10;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$6 = $$0;
      let tmpSwitchCaseToStart$6 = $$1;
      let tmpIfTest$16 = $$2;
      let tmpBinLhs$10 = $$3;
      let tmpIfTest$17 = $$4;
      debugger;
      const tmpReturnArg$11 = tmpBranchingC(tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpIfTest$16);
      return tmpReturnArg$11;
    };
    if (tmpIfTest$6) {
      const tmpReturnArg$12 = tmpBranchingA$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$5, tmpBinLhs$3, tmpIfTest$6);
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$5, tmpBinLhs$3, tmpIfTest$6);
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpIfTest$9 = $$2;
    debugger;
    const tmpLabeledBlockFunc = function ($$0, $$1, $$2) {
      let tmpSwitchValue$14 = $$0;
      let tmpSwitchCaseToStart$14 = $$1;
      let tmpIfTest$45 = $$2;
      debugger;
      const tmpIfTest$46 = tmpSwitchCaseToStart$14 <= 0;
      const tmpBranchingA$4 = function ($$0, $$1, $$2, $$3) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpIfTest$50 = $$2;
        let tmpIfTest$51 = $$3;
        debugger;
        $(2);
        const tmpReturnArg$18 = tmpAfterLabel(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpIfTest$50);
        return tmpReturnArg$18;
      };
      const tmpBranchingB$4 = function ($$0, $$1, $$2, $$3) {
        let tmpSwitchValue$16 = $$0;
        let tmpSwitchCaseToStart$16 = $$1;
        let tmpIfTest$52 = $$2;
        let tmpIfTest$53 = $$3;
        debugger;
        const tmpIfTest$54 = tmpSwitchCaseToStart$16 <= 1;
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4) {
          let tmpSwitchValue$18 = $$0;
          let tmpSwitchCaseToStart$18 = $$1;
          let tmpIfTest$59 = $$2;
          let tmpIfTest$60 = $$3;
          let tmpIfTest$61 = $$4;
          debugger;
          $(3);
          const tmpReturnArg$23 = tmpBranchingC$5(tmpSwitchValue$18, tmpSwitchCaseToStart$18, tmpIfTest$59, tmpIfTest$60, tmpIfTest$61);
          return tmpReturnArg$23;
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4) {
          let tmpSwitchValue$19 = $$0;
          let tmpSwitchCaseToStart$19 = $$1;
          let tmpIfTest$62 = $$2;
          let tmpIfTest$63 = $$3;
          let tmpIfTest$64 = $$4;
          debugger;
          const tmpReturnArg$24 = tmpBranchingC$5(tmpSwitchValue$19, tmpSwitchCaseToStart$19, tmpIfTest$62, tmpIfTest$63, tmpIfTest$64);
          return tmpReturnArg$24;
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4) {
          let tmpSwitchValue$20 = $$0;
          let tmpSwitchCaseToStart$20 = $$1;
          let tmpIfTest$65 = $$2;
          let tmpIfTest$66 = $$3;
          let tmpIfTest$67 = $$4;
          debugger;
          const tmpIfTest$68 = tmpSwitchCaseToStart$20 <= 2;
          const tmpBranchingA$6 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
            let tmpSwitchValue$21 = $$0;
            let tmpSwitchCaseToStart$21 = $$1;
            let tmpIfTest$70 = $$2;
            let tmpIfTest$71 = $$3;
            let tmpIfTest$72 = $$4;
            let tmpIfTest$73 = $$5;
            debugger;
            $(5);
            const tmpReturnArg$25 = $(6);
            return tmpReturnArg$25;
          };
          const tmpBranchingB$6 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
            let tmpSwitchValue$22 = $$0;
            let tmpSwitchCaseToStart$22 = $$1;
            let tmpIfTest$74 = $$2;
            let tmpIfTest$75 = $$3;
            let tmpIfTest$76 = $$4;
            let tmpIfTest$77 = $$5;
            debugger;
            const tmpIfTest$78 = tmpSwitchCaseToStart$22 <= 3;
            const tmpBranchingA$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
              let tmpSwitchValue$24 = $$0;
              let tmpSwitchCaseToStart$24 = $$1;
              let tmpIfTest$83 = $$2;
              let tmpIfTest$84 = $$3;
              let tmpIfTest$85 = $$4;
              let tmpIfTest$86 = $$5;
              let tmpIfTest$87 = $$6;
              debugger;
              const tmpReturnArg$27 = tmpAfterLabel(tmpSwitchValue$24, tmpSwitchCaseToStart$24, tmpIfTest$83);
              return tmpReturnArg$27;
            };
            const tmpBranchingB$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
              let tmpSwitchValue$25 = $$0;
              let tmpSwitchCaseToStart$25 = $$1;
              let tmpIfTest$88 = $$2;
              let tmpIfTest$89 = $$3;
              let tmpIfTest$90 = $$4;
              let tmpIfTest$91 = $$5;
              let tmpIfTest$92 = $$6;
              debugger;
              const tmpReturnArg$28 = tmpBranchingC$7(
                tmpSwitchValue$25,
                tmpSwitchCaseToStart$25,
                tmpIfTest$88,
                tmpIfTest$89,
                tmpIfTest$90,
                tmpIfTest$91,
                tmpIfTest$92,
              );
              return tmpReturnArg$28;
            };
            const tmpBranchingC$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
              let tmpSwitchValue$26 = $$0;
              let tmpSwitchCaseToStart$26 = $$1;
              let tmpIfTest$93 = $$2;
              let tmpIfTest$94 = $$3;
              let tmpIfTest$95 = $$4;
              let tmpIfTest$96 = $$5;
              let tmpIfTest$97 = $$6;
              debugger;
              const tmpReturnArg$29 = tmpBranchingC$6(
                tmpSwitchValue$26,
                tmpSwitchCaseToStart$26,
                tmpIfTest$93,
                tmpIfTest$94,
                tmpIfTest$95,
                tmpIfTest$96,
              );
              return tmpReturnArg$29;
            };
            if (tmpIfTest$78) {
              const tmpReturnArg$30 = tmpBranchingA$7(
                tmpSwitchValue$22,
                tmpSwitchCaseToStart$22,
                tmpIfTest$74,
                tmpIfTest$75,
                tmpIfTest$76,
                tmpIfTest$77,
                tmpIfTest$78,
              );
              return tmpReturnArg$30;
            } else {
              const tmpReturnArg$31 = tmpBranchingB$7(
                tmpSwitchValue$22,
                tmpSwitchCaseToStart$22,
                tmpIfTest$74,
                tmpIfTest$75,
                tmpIfTest$76,
                tmpIfTest$77,
                tmpIfTest$78,
              );
              return tmpReturnArg$31;
            }
          };
          const tmpBranchingC$6 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
            let tmpSwitchValue$23 = $$0;
            let tmpSwitchCaseToStart$23 = $$1;
            let tmpIfTest$79 = $$2;
            let tmpIfTest$80 = $$3;
            let tmpIfTest$81 = $$4;
            let tmpIfTest$82 = $$5;
            debugger;
            const tmpReturnArg$32 = tmpBranchingC$4(tmpSwitchValue$23, tmpSwitchCaseToStart$23, tmpIfTest$79, tmpIfTest$80);
            return tmpReturnArg$32;
          };
          if (tmpIfTest$68) {
            const tmpReturnArg$33 = tmpBranchingA$6(
              tmpSwitchValue$20,
              tmpSwitchCaseToStart$20,
              tmpIfTest$65,
              tmpIfTest$66,
              tmpIfTest$67,
              tmpIfTest$68,
            );
            return tmpReturnArg$33;
          } else {
            const tmpReturnArg$34 = tmpBranchingB$6(
              tmpSwitchValue$20,
              tmpSwitchCaseToStart$20,
              tmpIfTest$65,
              tmpIfTest$66,
              tmpIfTest$67,
              tmpIfTest$68,
            );
            return tmpReturnArg$34;
          }
        };
        if (tmpIfTest$54) {
          const tmpReturnArg$35 = tmpBranchingA$5(tmpSwitchValue$16, tmpSwitchCaseToStart$16, tmpIfTest$52, tmpIfTest$53, tmpIfTest$54);
          return tmpReturnArg$35;
        } else {
          const tmpReturnArg$36 = tmpBranchingB$5(tmpSwitchValue$16, tmpSwitchCaseToStart$16, tmpIfTest$52, tmpIfTest$53, tmpIfTest$54);
          return tmpReturnArg$36;
        }
      };
      const tmpBranchingC$4 = function ($$0, $$1, $$2, $$3) {
        let tmpSwitchValue$17 = $$0;
        let tmpSwitchCaseToStart$17 = $$1;
        let tmpIfTest$57 = $$2;
        let tmpIfTest$58 = $$3;
        debugger;
        const tmpReturnArg$37 = tmpAfterLabel(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$57);
        return tmpReturnArg$37;
      };
      if (tmpIfTest$46) {
        const tmpReturnArg$38 = tmpBranchingA$4(tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpIfTest$45, tmpIfTest$46);
        return tmpReturnArg$38;
      } else {
        const tmpReturnArg$39 = tmpBranchingB$4(tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpIfTest$45, tmpIfTest$46);
        return tmpReturnArg$39;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2) {
      let tmpSwitchValue$13 = $$0;
      let tmpSwitchCaseToStart$13 = $$1;
      let tmpIfTest$44 = $$2;
      debugger;
      $('after');
    };
    const tmpReturnArg$40 = tmpLabeledBlockFunc(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9);
    return tmpReturnArg$40;
  };
  if (tmpIfTest) {
    const tmpReturnArg$41 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$41;
  } else {
    const tmpReturnArg$42 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$42;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpSwitchValue = $(7);
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingB = function ($$0, $$1) {
    const tmpSwitchValue$2 = $$0;
    const tmpSwitchCaseToStart$2 = $$1;
    debugger;
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$6 = tmpBinLhs$3 === tmpSwitchValue$2;
    const tmpBranchingB$1 = function ($$0, $$1) {
      const tmpSwitchValue$5 = $$0;
      const tmpSwitchCaseToStart$5 = $$1;
      debugger;
      const tmpBinLhs$8 = $(4);
      const tmpIfTest$14 = tmpBinLhs$8 === tmpSwitchValue$5;
      const tmpBranchingB$2 = function ($$0, $$1) {
        const tmpSwitchValue$8 = $$0;
        const tmpSwitchCaseToStart$8 = $$1;
        debugger;
        const tmpBinLhs$15 = $(7);
        const tmpIfTest$24 = tmpBinLhs$15 === tmpSwitchValue$8;
        if (tmpIfTest$24) {
          const tmpReturnArg$6 = tmpBranchingC(3);
          return tmpReturnArg$6;
        } else {
          const tmpReturnArg$7 = tmpBranchingC(tmpSwitchCaseToStart$8);
          return tmpReturnArg$7;
        }
      };
      if (tmpIfTest$14) {
        const tmpReturnArg$9 = tmpBranchingC(2);
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$10 = tmpBranchingB$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5);
        return tmpReturnArg$10;
      }
    };
    if (tmpIfTest$6) {
      const tmpReturnArg$12 = tmpBranchingC(1);
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2);
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingC = function ($$0) {
    const tmpSwitchCaseToStart$3 = $$0;
    debugger;
    const tmpIfTest$46 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$4 = function ($$0) {
      const tmpSwitchCaseToStart$16 = $$0;
      debugger;
      const tmpIfTest$54 = tmpSwitchCaseToStart$16 <= 1;
      const tmpBranchingC$5 = function ($$0) {
        const tmpSwitchCaseToStart$20 = $$0;
        debugger;
        const tmpIfTest$68 = tmpSwitchCaseToStart$20 <= 2;
        const tmpBranchingB$6 = function ($$0) {
          const tmpSwitchCaseToStart$22 = $$0;
          debugger;
          const tmpIfTest$78 = tmpSwitchCaseToStart$22 <= 3;
          if (tmpIfTest$78) {
            $('after');
            return undefined;
          } else {
            $('after');
            return undefined;
          }
        };
        if (tmpIfTest$68) {
          $(5);
          const tmpReturnArg$25 = $(6);
          return tmpReturnArg$25;
        } else {
          const tmpReturnArg$34 = tmpBranchingB$6(tmpSwitchCaseToStart$20);
          return tmpReturnArg$34;
        }
      };
      if (tmpIfTest$54) {
        $(3);
        const tmpReturnArg$23 = tmpBranchingC$5(tmpSwitchCaseToStart$16);
        return tmpReturnArg$23;
      } else {
        const tmpReturnArg$36 = tmpBranchingC$5(tmpSwitchCaseToStart$16);
        return tmpReturnArg$36;
      }
    };
    if (tmpIfTest$46) {
      $(2);
      $('after');
      return undefined;
    } else {
      const tmpReturnArg$2 = tmpBranchingB$4(tmpSwitchCaseToStart$3);
      return tmpReturnArg$2;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$41 = tmpBranchingC(0);
    return tmpReturnArg$41;
  } else {
    const tmpReturnArg$42 = tmpBranchingB(tmpSwitchValue, 4);
    return tmpReturnArg$42;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7
 - 2: 1
 - 3: 4
 - 4: 7
 - 5: 'after'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
