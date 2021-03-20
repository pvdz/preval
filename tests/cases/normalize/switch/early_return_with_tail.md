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
  const tmpSwitchValue = $(7);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function (tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$4) {
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$4);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$5) {
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$6 = tmpBinLhs$3 === tmpSwitchValue$2;
    const tmpBranchingA$1 = function (tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$10, tmpBinLhs$6, tmpIfTest$11) {
      tmpSwitchCaseToStart$4 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$10, tmpBinLhs$6, tmpIfTest$11);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$12, tmpBinLhs$7, tmpIfTest$13) {
      const tmpBinLhs$8 = $(4);
      const tmpIfTest$14 = tmpBinLhs$8 === tmpSwitchValue$5;
      const tmpBranchingA$2 = function (
        tmpSwitchValue$7,
        tmpSwitchCaseToStart$7,
        tmpIfTest$18,
        tmpBinLhs$11,
        tmpIfTest$19,
        tmpBinLhs$12,
        tmpIfTest$20,
      ) {
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
      const tmpBranchingB$2 = function (
        tmpSwitchValue$8,
        tmpSwitchCaseToStart$8,
        tmpIfTest$21,
        tmpBinLhs$13,
        tmpIfTest$22,
        tmpBinLhs$14,
        tmpIfTest$23,
      ) {
        const tmpBinLhs$15 = $(7);
        const tmpIfTest$24 = tmpBinLhs$15 === tmpSwitchValue$8;
        const tmpBranchingA$3 = function (
          tmpSwitchValue$10,
          tmpSwitchCaseToStart$10,
          tmpIfTest$28,
          tmpBinLhs$18,
          tmpIfTest$29,
          tmpBinLhs$19,
          tmpIfTest$30,
          tmpBinLhs$20,
          tmpIfTest$31,
        ) {
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
        const tmpBranchingB$3 = function (
          tmpSwitchValue$11,
          tmpSwitchCaseToStart$11,
          tmpIfTest$32,
          tmpBinLhs$21,
          tmpIfTest$33,
          tmpBinLhs$22,
          tmpIfTest$34,
          tmpBinLhs$23,
          tmpIfTest$35,
        ) {
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
        const tmpBranchingC$3 = function (
          tmpSwitchValue$12,
          tmpSwitchCaseToStart$12,
          tmpIfTest$36,
          tmpBinLhs$24,
          tmpIfTest$37,
          tmpBinLhs$25,
          tmpIfTest$38,
          tmpBinLhs$26,
          tmpIfTest$39,
        ) {
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
      const tmpBranchingC$2 = function (
        tmpSwitchValue$9,
        tmpSwitchCaseToStart$9,
        tmpIfTest$25,
        tmpBinLhs$16,
        tmpIfTest$26,
        tmpBinLhs$17,
        tmpIfTest$27,
      ) {
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
    const tmpBranchingC$1 = function (tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpIfTest$16, tmpBinLhs$10, tmpIfTest$17) {
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
  const tmpBranchingC = function (tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9) {
    const tmpBranchingC$4 = function (tmpSwitchValue$13, tmpSwitchCaseToStart$13, tmpIfTest$44) {
      $('after');
    };
    const tmpLabeledBlockFunc = function (tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpIfTest$45) {
      const tmpIfTest$46 = tmpSwitchCaseToStart$14 <= 0;
      const tmpBranchingA$4 = function (tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpIfTest$50, tmpIfTest$51) {
        $(2);
        const tmpReturnArg$18 = tmpBranchingC$4(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpIfTest$50);
        return tmpReturnArg$18;
      };
      const tmpBranchingB$4 = function (tmpSwitchValue$16, tmpSwitchCaseToStart$16, tmpIfTest$52, tmpIfTest$53) {
        const tmpIfTest$54 = tmpSwitchCaseToStart$16 <= 1;
        const tmpBranchingA$5 = function (tmpSwitchValue$18, tmpSwitchCaseToStart$18, tmpIfTest$59, tmpIfTest$60, tmpIfTest$61) {
          $(3);
          const tmpReturnArg$23 = tmpBranchingC$6(tmpSwitchValue$18, tmpSwitchCaseToStart$18, tmpIfTest$59, tmpIfTest$60, tmpIfTest$61);
          return tmpReturnArg$23;
        };
        const tmpBranchingB$5 = function (tmpSwitchValue$19, tmpSwitchCaseToStart$19, tmpIfTest$62, tmpIfTest$63, tmpIfTest$64) {
          const tmpReturnArg$24 = tmpBranchingC$6(tmpSwitchValue$19, tmpSwitchCaseToStart$19, tmpIfTest$62, tmpIfTest$63, tmpIfTest$64);
          return tmpReturnArg$24;
        };
        const tmpBranchingC$6 = function (tmpSwitchValue$20, tmpSwitchCaseToStart$20, tmpIfTest$65, tmpIfTest$66, tmpIfTest$67) {
          const tmpIfTest$68 = tmpSwitchCaseToStart$20 <= 2;
          const tmpBranchingA$6 = function (
            tmpSwitchValue$21,
            tmpSwitchCaseToStart$21,
            tmpIfTest$70,
            tmpIfTest$71,
            tmpIfTest$72,
            tmpIfTest$73,
          ) {
            $(5);
            const tmpReturnArg$25 = $(6);
            return tmpReturnArg$25;
          };
          const tmpBranchingB$6 = function (
            tmpSwitchValue$22,
            tmpSwitchCaseToStart$22,
            tmpIfTest$74,
            tmpIfTest$75,
            tmpIfTest$76,
            tmpIfTest$77,
          ) {
            const tmpIfTest$78 = tmpSwitchCaseToStart$22 <= 3;
            const tmpBranchingA$7 = function (
              tmpSwitchValue$24,
              tmpSwitchCaseToStart$24,
              tmpIfTest$83,
              tmpIfTest$84,
              tmpIfTest$85,
              tmpIfTest$86,
              tmpIfTest$87,
            ) {
              const tmpReturnArg$27 = tmpBranchingC$4(tmpSwitchValue$24, tmpSwitchCaseToStart$24, tmpIfTest$83);
              return tmpReturnArg$27;
            };
            const tmpBranchingB$7 = function (
              tmpSwitchValue$25,
              tmpSwitchCaseToStart$25,
              tmpIfTest$88,
              tmpIfTest$89,
              tmpIfTest$90,
              tmpIfTest$91,
              tmpIfTest$92,
            ) {
              const tmpReturnArg$28 = tmpBranchingC$8(
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
            const tmpBranchingC$8 = function (
              tmpSwitchValue$26,
              tmpSwitchCaseToStart$26,
              tmpIfTest$93,
              tmpIfTest$94,
              tmpIfTest$95,
              tmpIfTest$96,
              tmpIfTest$97,
            ) {
              const tmpReturnArg$29 = tmpBranchingC$7(
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
          const tmpBranchingC$7 = function (
            tmpSwitchValue$23,
            tmpSwitchCaseToStart$23,
            tmpIfTest$79,
            tmpIfTest$80,
            tmpIfTest$81,
            tmpIfTest$82,
          ) {
            const tmpReturnArg$32 = tmpBranchingC$5(tmpSwitchValue$23, tmpSwitchCaseToStart$23, tmpIfTest$79, tmpIfTest$80);
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
      const tmpBranchingC$5 = function (tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$57, tmpIfTest$58) {
        const tmpReturnArg$37 = tmpBranchingC$4(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$57);
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
  const tmpSwitchValue = $(7);
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingB = function (tmpSwitchValue$2, tmpSwitchCaseToStart$2) {
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$6 = tmpBinLhs$3 === tmpSwitchValue$2;
    const tmpBranchingB$1 = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5) {
      const tmpBinLhs$8 = $(4);
      const tmpIfTest$14 = tmpBinLhs$8 === tmpSwitchValue$5;
      const tmpBranchingB$2 = function (tmpSwitchValue$8, tmpSwitchCaseToStart$8) {
        const tmpBinLhs$15 = $(7);
        const tmpIfTest$24 = tmpBinLhs$15 === tmpSwitchValue$8;
        if (tmpIfTest$24) {
          const tmpReturnArg$3 = tmpBranchingC(3);
          return tmpReturnArg$3;
        } else {
          const tmpReturnArg$7 = tmpBranchingC(tmpSwitchCaseToStart$8);
          return tmpReturnArg$7;
        }
      };
      if (tmpIfTest$14) {
        const tmpReturnArg$2 = tmpBranchingC(2);
        return tmpReturnArg$2;
      } else {
        const tmpReturnArg$10 = tmpBranchingB$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5);
        return tmpReturnArg$10;
      }
    };
    if (tmpIfTest$6) {
      const tmpReturnArg$1 = tmpBranchingC(1);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2);
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingC = function (tmpSwitchCaseToStart$3) {
    const tmpIfTest$46 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$4 = function (tmpSwitchCaseToStart$16) {
      const tmpIfTest$54 = tmpSwitchCaseToStart$16 <= 1;
      const tmpBranchingC$6 = function (tmpSwitchCaseToStart$20) {
        const tmpIfTest$68 = tmpSwitchCaseToStart$20 <= 2;
        const tmpBranchingB$6 = function (tmpSwitchCaseToStart$22) {
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
        const tmpReturnArg$23 = tmpBranchingC$6(tmpSwitchCaseToStart$16);
        return tmpReturnArg$23;
      } else {
        const tmpReturnArg$36 = tmpBranchingC$6(tmpSwitchCaseToStart$16);
        return tmpReturnArg$36;
      }
    };
    if (tmpIfTest$46) {
      $(2);
      $('after');
      return undefined;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$4(tmpSwitchCaseToStart$3);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg = tmpBranchingC(0);
    return tmpReturnArg;
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
