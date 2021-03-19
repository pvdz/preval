# Preval test case

# odd_early_return.md

> Normalize > Switch > Odd early return
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1)) {                         
    case 0:                               
      $(2);                               
      break;                              
    case $(1):                            
      if ($(8)) {                         
        if ($(9)) {                       
          return $(10);                   
        } else {                          
          $(11);                          
        }

        if ($(2)) {
          $(13);
        } else {
          return $(14);
        }
      }
      $(3);
    case $(4):
      $(5);
      return $(6);
    case $(7):
      break;
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = $(1);
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
        if ($(8)) {
          if ($(9)) {
            return $(10);
          } else {
            $(11);
          }
          if ($(2)) {
            $(13);
          } else {
            return $(14);
          }
        }
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
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpSwitchValue = $(1);
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
    const tmpIfTest$40 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingA$4 = function (tmpSwitchValue$13, tmpSwitchCaseToStart$13, tmpIfTest$47, tmpIfTest$48) {
      $(2);
    };
    const tmpBranchingB$4 = function (tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpIfTest$49, tmpIfTest$50) {
      const tmpIfTest$51 = tmpSwitchCaseToStart$14 <= 1;
      const tmpBranchingA$5 = function (tmpSwitchValue$16, tmpSwitchCaseToStart$16, tmpIfTest$59, tmpIfTest$60, tmpIfTest$61) {
        const tmpIfTest$62 = $(8);
        const tmpBranchingA$6 = function (
          tmpSwitchValue$19,
          tmpSwitchCaseToStart$19,
          tmpIfTest$73,
          tmpIfTest$74,
          tmpIfTest$75,
          tmpIfTest$76,
        ) {
          const tmpIfTest$77 = $(9);
          const tmpBranchingA$7 = function (
            tmpSwitchValue$22,
            tmpSwitchCaseToStart$22,
            tmpIfTest$87,
            tmpIfTest$88,
            tmpIfTest$89,
            tmpIfTest$90,
            tmpIfTest$91,
          ) {
            const tmpReturnArg$25 = $(10);
            return tmpReturnArg$25;
          };
          const tmpBranchingB$7 = function (
            tmpSwitchValue$23,
            tmpSwitchCaseToStart$23,
            tmpIfTest$92,
            tmpIfTest$93,
            tmpIfTest$94,
            tmpIfTest$95,
            tmpIfTest$96,
          ) {
            $(11);
            const tmpIfTest$97 = $(2);
            const tmpBranchingA$8 = function (
              tmpSwitchValue$25,
              tmpSwitchCaseToStart$25,
              tmpIfTest$103,
              tmpIfTest$104,
              tmpIfTest$105,
              tmpIfTest$106,
              tmpIfTest$107,
              tmpIfTest$108,
            ) {
              $(13);
              const tmpReturnArg$28 = tmpBranchingC$8(
                tmpSwitchValue$25,
                tmpSwitchCaseToStart$25,
                tmpIfTest$103,
                tmpIfTest$104,
                tmpIfTest$105,
                tmpIfTest$106,
                tmpIfTest$107,
                tmpIfTest$108,
              );
              return tmpReturnArg$28;
            };
            const tmpBranchingB$8 = function (
              tmpSwitchValue$26,
              tmpSwitchCaseToStart$26,
              tmpIfTest$109,
              tmpIfTest$110,
              tmpIfTest$111,
              tmpIfTest$112,
              tmpIfTest$113,
              tmpIfTest$114,
            ) {
              const tmpReturnArg$27 = $(14);
              return tmpReturnArg$27;
            };
            const tmpBranchingC$8 = function (
              tmpSwitchValue$27,
              tmpSwitchCaseToStart$27,
              tmpIfTest$115,
              tmpIfTest$116,
              tmpIfTest$117,
              tmpIfTest$118,
              tmpIfTest$119,
              tmpIfTest$120,
            ) {
              const tmpReturnArg$29 = tmpBranchingC$7(
                tmpSwitchValue$27,
                tmpSwitchCaseToStart$27,
                tmpIfTest$115,
                tmpIfTest$116,
                tmpIfTest$117,
                tmpIfTest$118,
                tmpIfTest$119,
              );
              return tmpReturnArg$29;
            };
            if (tmpIfTest$97) {
              const tmpReturnArg$30 = tmpBranchingA$8(
                tmpSwitchValue$23,
                tmpSwitchCaseToStart$23,
                tmpIfTest$92,
                tmpIfTest$93,
                tmpIfTest$94,
                tmpIfTest$95,
                tmpIfTest$96,
                tmpIfTest$97,
              );
              return tmpReturnArg$30;
            } else {
              const tmpReturnArg$31 = tmpBranchingB$8(
                tmpSwitchValue$23,
                tmpSwitchCaseToStart$23,
                tmpIfTest$92,
                tmpIfTest$93,
                tmpIfTest$94,
                tmpIfTest$95,
                tmpIfTest$96,
                tmpIfTest$97,
              );
              return tmpReturnArg$31;
            }
          };
          const tmpBranchingC$7 = function (
            tmpSwitchValue$24,
            tmpSwitchCaseToStart$24,
            tmpIfTest$98,
            tmpIfTest$99,
            tmpIfTest$100,
            tmpIfTest$101,
            tmpIfTest$102,
          ) {
            const tmpReturnArg$32 = tmpBranchingC$6(
              tmpSwitchValue$24,
              tmpSwitchCaseToStart$24,
              tmpIfTest$98,
              tmpIfTest$99,
              tmpIfTest$100,
              tmpIfTest$101,
            );
            return tmpReturnArg$32;
          };
          if (tmpIfTest$77) {
            const tmpReturnArg$33 = tmpBranchingA$7(
              tmpSwitchValue$19,
              tmpSwitchCaseToStart$19,
              tmpIfTest$73,
              tmpIfTest$74,
              tmpIfTest$75,
              tmpIfTest$76,
              tmpIfTest$77,
            );
            return tmpReturnArg$33;
          } else {
            const tmpReturnArg$34 = tmpBranchingB$7(
              tmpSwitchValue$19,
              tmpSwitchCaseToStart$19,
              tmpIfTest$73,
              tmpIfTest$74,
              tmpIfTest$75,
              tmpIfTest$76,
              tmpIfTest$77,
            );
            return tmpReturnArg$34;
          }
        };
        const tmpBranchingB$6 = function (
          tmpSwitchValue$20,
          tmpSwitchCaseToStart$20,
          tmpIfTest$79,
          tmpIfTest$80,
          tmpIfTest$81,
          tmpIfTest$82,
        ) {
          const tmpReturnArg$35 = tmpBranchingC$6(
            tmpSwitchValue$20,
            tmpSwitchCaseToStart$20,
            tmpIfTest$79,
            tmpIfTest$80,
            tmpIfTest$81,
            tmpIfTest$82,
          );
          return tmpReturnArg$35;
        };
        const tmpBranchingC$6 = function (
          tmpSwitchValue$21,
          tmpSwitchCaseToStart$21,
          tmpIfTest$83,
          tmpIfTest$84,
          tmpIfTest$85,
          tmpIfTest$86,
        ) {
          $(3);
          const tmpReturnArg$36 = tmpBranchingC$5(tmpSwitchValue$21, tmpSwitchCaseToStart$21, tmpIfTest$83, tmpIfTest$84, tmpIfTest$85);
          return tmpReturnArg$36;
        };
        if (tmpIfTest$62) {
          const tmpReturnArg$37 = tmpBranchingA$6(
            tmpSwitchValue$16,
            tmpSwitchCaseToStart$16,
            tmpIfTest$59,
            tmpIfTest$60,
            tmpIfTest$61,
            tmpIfTest$62,
          );
          return tmpReturnArg$37;
        } else {
          const tmpReturnArg$38 = tmpBranchingB$6(
            tmpSwitchValue$16,
            tmpSwitchCaseToStart$16,
            tmpIfTest$59,
            tmpIfTest$60,
            tmpIfTest$61,
            tmpIfTest$62,
          );
          return tmpReturnArg$38;
        }
      };
      const tmpBranchingB$5 = function (tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$65, tmpIfTest$66, tmpIfTest$67) {
        const tmpReturnArg$39 = tmpBranchingC$5(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$65, tmpIfTest$66, tmpIfTest$67);
        return tmpReturnArg$39;
      };
      const tmpBranchingC$5 = function (tmpSwitchValue$18, tmpSwitchCaseToStart$18, tmpIfTest$68, tmpIfTest$69, tmpIfTest$70) {
        const tmpIfTest$71 = tmpSwitchCaseToStart$18 <= 2;
        const tmpBranchingA$9 = function (
          tmpSwitchValue$28,
          tmpSwitchCaseToStart$28,
          tmpIfTest$121,
          tmpIfTest$122,
          tmpIfTest$123,
          tmpIfTest$124,
        ) {
          $(5);
          const tmpReturnArg$40 = $(6);
          return tmpReturnArg$40;
        };
        const tmpBranchingB$9 = function (
          tmpSwitchValue$29,
          tmpSwitchCaseToStart$29,
          tmpIfTest$125,
          tmpIfTest$126,
          tmpIfTest$127,
          tmpIfTest$128,
        ) {
          const tmpIfTest$129 = tmpSwitchCaseToStart$29 <= 3;
          const tmpBranchingA$10 = function (
            tmpSwitchValue$31,
            tmpSwitchCaseToStart$31,
            tmpIfTest$134,
            tmpIfTest$135,
            tmpIfTest$136,
            tmpIfTest$137,
            tmpIfTest$138,
          ) {};
          const tmpBranchingB$10 = function (
            tmpSwitchValue$32,
            tmpSwitchCaseToStart$32,
            tmpIfTest$139,
            tmpIfTest$140,
            tmpIfTest$141,
            tmpIfTest$142,
            tmpIfTest$143,
          ) {
            const tmpReturnArg$41 = tmpBranchingC$10(
              tmpSwitchValue$32,
              tmpSwitchCaseToStart$32,
              tmpIfTest$139,
              tmpIfTest$140,
              tmpIfTest$141,
              tmpIfTest$142,
              tmpIfTest$143,
            );
            return tmpReturnArg$41;
          };
          const tmpBranchingC$10 = function (
            tmpSwitchValue$33,
            tmpSwitchCaseToStart$33,
            tmpIfTest$144,
            tmpIfTest$145,
            tmpIfTest$146,
            tmpIfTest$147,
            tmpIfTest$148,
          ) {
            const tmpReturnArg$42 = tmpBranchingC$9(
              tmpSwitchValue$33,
              tmpSwitchCaseToStart$33,
              tmpIfTest$144,
              tmpIfTest$145,
              tmpIfTest$146,
              tmpIfTest$147,
            );
            return tmpReturnArg$42;
          };
          if (tmpIfTest$129) {
            const tmpReturnArg$43 = tmpBranchingA$10(
              tmpSwitchValue$29,
              tmpSwitchCaseToStart$29,
              tmpIfTest$125,
              tmpIfTest$126,
              tmpIfTest$127,
              tmpIfTest$128,
              tmpIfTest$129,
            );
            return tmpReturnArg$43;
          } else {
            const tmpReturnArg$44 = tmpBranchingB$10(
              tmpSwitchValue$29,
              tmpSwitchCaseToStart$29,
              tmpIfTest$125,
              tmpIfTest$126,
              tmpIfTest$127,
              tmpIfTest$128,
              tmpIfTest$129,
            );
            return tmpReturnArg$44;
          }
        };
        const tmpBranchingC$9 = function (
          tmpSwitchValue$30,
          tmpSwitchCaseToStart$30,
          tmpIfTest$130,
          tmpIfTest$131,
          tmpIfTest$132,
          tmpIfTest$133,
        ) {
          const tmpReturnArg$45 = tmpBranchingC$4(tmpSwitchValue$30, tmpSwitchCaseToStart$30, tmpIfTest$130, tmpIfTest$131);
          return tmpReturnArg$45;
        };
        if (tmpIfTest$71) {
          const tmpReturnArg$46 = tmpBranchingA$9(
            tmpSwitchValue$18,
            tmpSwitchCaseToStart$18,
            tmpIfTest$68,
            tmpIfTest$69,
            tmpIfTest$70,
            tmpIfTest$71,
          );
          return tmpReturnArg$46;
        } else {
          const tmpReturnArg$47 = tmpBranchingB$9(
            tmpSwitchValue$18,
            tmpSwitchCaseToStart$18,
            tmpIfTest$68,
            tmpIfTest$69,
            tmpIfTest$70,
            tmpIfTest$71,
          );
          return tmpReturnArg$47;
        }
      };
      if (tmpIfTest$51) {
        const tmpReturnArg$48 = tmpBranchingA$5(tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpIfTest$49, tmpIfTest$50, tmpIfTest$51);
        return tmpReturnArg$48;
      } else {
        const tmpReturnArg$49 = tmpBranchingB$5(tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpIfTest$49, tmpIfTest$50, tmpIfTest$51);
        return tmpReturnArg$49;
      }
    };
    const tmpBranchingC$4 = function (tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpIfTest$57, tmpIfTest$58) {};
    if (tmpIfTest$40) {
      const tmpReturnArg$50 = tmpBranchingA$4(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9, tmpIfTest$40);
      return tmpReturnArg$50;
    } else {
      const tmpReturnArg$51 = tmpBranchingB$4(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9, tmpIfTest$40);
      return tmpReturnArg$51;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$52 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$52;
  } else {
    const tmpReturnArg$53 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$53;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpSwitchValue = $(1);
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
    const tmpIfTest$40 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$4 = function (tmpSwitchCaseToStart$14) {
      const tmpIfTest$51 = tmpSwitchCaseToStart$14 <= 1;
      const tmpBranchingA$5 = function (tmpSwitchCaseToStart$16) {
        const tmpIfTest$62 = $(8);
        const tmpBranchingA$6 = function (tmpSwitchCaseToStart$19) {
          const tmpIfTest$77 = $(9);
          const tmpBranchingB$7 = function (tmpSwitchCaseToStart$23) {
            $(11);
            const tmpIfTest$97 = $(2);
            if (tmpIfTest$97) {
              $(13);
              const tmpReturnArg$28 = tmpBranchingC$6(tmpSwitchCaseToStart$23);
              return tmpReturnArg$28;
            } else {
              const tmpReturnArg$31 = $(14);
              return tmpReturnArg$31;
            }
          };
          if (tmpIfTest$77) {
            const tmpReturnArg$33 = $(10);
            return tmpReturnArg$33;
          } else {
            const tmpReturnArg$34 = tmpBranchingB$7(tmpSwitchCaseToStart$19);
            return tmpReturnArg$34;
          }
        };
        const tmpBranchingC$6 = function (tmpSwitchCaseToStart$21) {
          $(3);
          const tmpReturnArg$36 = tmpBranchingC$5(tmpSwitchCaseToStart$21);
          return tmpReturnArg$36;
        };
        if (tmpIfTest$62) {
          const tmpReturnArg$37 = tmpBranchingA$6(tmpSwitchCaseToStart$16);
          return tmpReturnArg$37;
        } else {
          const tmpReturnArg$38 = tmpBranchingC$6(tmpSwitchCaseToStart$16);
          return tmpReturnArg$38;
        }
      };
      const tmpBranchingC$5 = function (tmpSwitchCaseToStart$18) {
        const tmpIfTest$71 = tmpSwitchCaseToStart$18 <= 2;
        const tmpBranchingB$9 = function (tmpSwitchCaseToStart$29) {
          const tmpIfTest$129 = tmpSwitchCaseToStart$29 <= 3;
          if (tmpIfTest$129) {
            return undefined;
          } else {
            return undefined;
          }
        };
        if (tmpIfTest$71) {
          $(5);
          const tmpReturnArg$40 = $(6);
          return tmpReturnArg$40;
        } else {
          const tmpReturnArg$47 = tmpBranchingB$9(tmpSwitchCaseToStart$18);
          return tmpReturnArg$47;
        }
      };
      if (tmpIfTest$51) {
        const tmpReturnArg$48 = tmpBranchingA$5(tmpSwitchCaseToStart$14);
        return tmpReturnArg$48;
      } else {
        const tmpReturnArg$49 = tmpBranchingC$5(tmpSwitchCaseToStart$14);
        return tmpReturnArg$49;
      }
    };
    if (tmpIfTest$40) {
      $(2);
      return undefined;
    } else {
      const tmpReturnArg$51 = tmpBranchingB$4(tmpSwitchCaseToStart$3);
      return tmpReturnArg$51;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg = tmpBranchingC(0);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$53 = tmpBranchingB(tmpSwitchValue, 4);
    return tmpReturnArg$53;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 8
 - 4: 9
 - 5: 10
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
