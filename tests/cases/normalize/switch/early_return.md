# Preval test case

# early_return.md

> Normalize > Switch > Early return
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
  debugger;
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
  debugger;
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$7);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpIfTest$9 = $$2;
    debugger;
    const tmpBinLhs$5 = $(1);
    const tmpIfTest$11 = tmpBinLhs$5 === tmpSwitchValue$3;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpBinLhs$11 = $$3;
      let tmpIfTest$21 = $$4;
      debugger;
      tmpSwitchCaseToStart$7 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$19, tmpBinLhs$11, tmpIfTest$21);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$9 = $$0;
      let tmpSwitchCaseToStart$9 = $$1;
      let tmpIfTest$23 = $$2;
      let tmpBinLhs$13 = $$3;
      let tmpIfTest$25 = $$4;
      debugger;
      const tmpBinLhs$15 = $(4);
      const tmpIfTest$27 = tmpBinLhs$15 === tmpSwitchValue$9;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$13 = $$0;
        let tmpSwitchCaseToStart$13 = $$1;
        let tmpIfTest$35 = $$2;
        let tmpBinLhs$21 = $$3;
        let tmpIfTest$37 = $$4;
        let tmpBinLhs$23 = $$5;
        let tmpIfTest$39 = $$6;
        debugger;
        tmpSwitchCaseToStart$13 = 2;
        const tmpReturnArg$3 = tmpBranchingC$3(
          tmpSwitchValue$13,
          tmpSwitchCaseToStart$13,
          tmpIfTest$35,
          tmpBinLhs$21,
          tmpIfTest$37,
          tmpBinLhs$23,
          tmpIfTest$39,
        );
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpIfTest$41 = $$2;
        let tmpBinLhs$25 = $$3;
        let tmpIfTest$43 = $$4;
        let tmpBinLhs$27 = $$5;
        let tmpIfTest$45 = $$6;
        debugger;
        const tmpBinLhs$29 = $(7);
        const tmpIfTest$47 = tmpBinLhs$29 === tmpSwitchValue$15;
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$19 = $$0;
          let tmpSwitchCaseToStart$19 = $$1;
          let tmpIfTest$55 = $$2;
          let tmpBinLhs$35 = $$3;
          let tmpIfTest$57 = $$4;
          let tmpBinLhs$37 = $$5;
          let tmpIfTest$59 = $$6;
          let tmpBinLhs$39 = $$7;
          let tmpIfTest$61 = $$8;
          debugger;
          tmpSwitchCaseToStart$19 = 3;
          const tmpReturnArg$5 = tmpBranchingC$5(
            tmpSwitchValue$19,
            tmpSwitchCaseToStart$19,
            tmpIfTest$55,
            tmpBinLhs$35,
            tmpIfTest$57,
            tmpBinLhs$37,
            tmpIfTest$59,
            tmpBinLhs$39,
            tmpIfTest$61,
          );
          return tmpReturnArg$5;
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$21 = $$0;
          let tmpSwitchCaseToStart$21 = $$1;
          let tmpIfTest$63 = $$2;
          let tmpBinLhs$41 = $$3;
          let tmpIfTest$65 = $$4;
          let tmpBinLhs$43 = $$5;
          let tmpIfTest$67 = $$6;
          let tmpBinLhs$45 = $$7;
          let tmpIfTest$69 = $$8;
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$5(
            tmpSwitchValue$21,
            tmpSwitchCaseToStart$21,
            tmpIfTest$63,
            tmpBinLhs$41,
            tmpIfTest$65,
            tmpBinLhs$43,
            tmpIfTest$67,
            tmpBinLhs$45,
            tmpIfTest$69,
          );
          return tmpReturnArg$7;
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$23 = $$0;
          let tmpSwitchCaseToStart$23 = $$1;
          let tmpIfTest$71 = $$2;
          let tmpBinLhs$47 = $$3;
          let tmpIfTest$73 = $$4;
          let tmpBinLhs$49 = $$5;
          let tmpIfTest$75 = $$6;
          let tmpBinLhs$51 = $$7;
          let tmpIfTest$77 = $$8;
          debugger;
          const tmpReturnArg$9 = tmpBranchingC$3(
            tmpSwitchValue$23,
            tmpSwitchCaseToStart$23,
            tmpIfTest$71,
            tmpBinLhs$47,
            tmpIfTest$73,
            tmpBinLhs$49,
            tmpIfTest$75,
          );
          return tmpReturnArg$9;
        };
        if (tmpIfTest$47) {
          const tmpReturnArg$11 = tmpBranchingA$5(
            tmpSwitchValue$15,
            tmpSwitchCaseToStart$15,
            tmpIfTest$41,
            tmpBinLhs$25,
            tmpIfTest$43,
            tmpBinLhs$27,
            tmpIfTest$45,
            tmpBinLhs$29,
            tmpIfTest$47,
          );
          return tmpReturnArg$11;
        } else {
          const tmpReturnArg$13 = tmpBranchingB$5(
            tmpSwitchValue$15,
            tmpSwitchCaseToStart$15,
            tmpIfTest$41,
            tmpBinLhs$25,
            tmpIfTest$43,
            tmpBinLhs$27,
            tmpIfTest$45,
            tmpBinLhs$29,
            tmpIfTest$47,
          );
          return tmpReturnArg$13;
        }
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$17 = $$0;
        let tmpSwitchCaseToStart$17 = $$1;
        let tmpIfTest$49 = $$2;
        let tmpBinLhs$31 = $$3;
        let tmpIfTest$51 = $$4;
        let tmpBinLhs$33 = $$5;
        let tmpIfTest$53 = $$6;
        debugger;
        const tmpReturnArg$15 = tmpBranchingC$1(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$49, tmpBinLhs$31, tmpIfTest$51);
        return tmpReturnArg$15;
      };
      if (tmpIfTest$27) {
        const tmpReturnArg$17 = tmpBranchingA$3(
          tmpSwitchValue$9,
          tmpSwitchCaseToStart$9,
          tmpIfTest$23,
          tmpBinLhs$13,
          tmpIfTest$25,
          tmpBinLhs$15,
          tmpIfTest$27,
        );
        return tmpReturnArg$17;
      } else {
        const tmpReturnArg$19 = tmpBranchingB$3(
          tmpSwitchValue$9,
          tmpSwitchCaseToStart$9,
          tmpIfTest$23,
          tmpBinLhs$13,
          tmpIfTest$25,
          tmpBinLhs$15,
          tmpIfTest$27,
        );
        return tmpReturnArg$19;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$11 = $$0;
      let tmpSwitchCaseToStart$11 = $$1;
      let tmpIfTest$31 = $$2;
      let tmpBinLhs$19 = $$3;
      let tmpIfTest$33 = $$4;
      debugger;
      const tmpReturnArg$21 = tmpBranchingC(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpIfTest$31);
      return tmpReturnArg$21;
    };
    if (tmpIfTest$11) {
      const tmpReturnArg$23 = tmpBranchingA$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9, tmpBinLhs$5, tmpIfTest$11);
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9, tmpBinLhs$5, tmpIfTest$11);
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpSwitchValue$5 = $$0;
    let tmpSwitchCaseToStart$5 = $$1;
    let tmpIfTest$17 = $$2;
    debugger;
    const tmpIfTest$79 = tmpSwitchCaseToStart$5 <= 0;
    const tmpBranchingA$7 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$25 = $$0;
      let tmpSwitchCaseToStart$25 = $$1;
      let tmpIfTest$87 = $$2;
      let tmpIfTest$89 = $$3;
      debugger;
      $(2);
    };
    const tmpBranchingB$7 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$27 = $$0;
      let tmpSwitchCaseToStart$27 = $$1;
      let tmpIfTest$91 = $$2;
      let tmpIfTest$93 = $$3;
      debugger;
      const tmpIfTest$95 = tmpSwitchCaseToStart$27 <= 1;
      const tmpBranchingA$9 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$31 = $$0;
        let tmpSwitchCaseToStart$31 = $$1;
        let tmpIfTest$105 = $$2;
        let tmpIfTest$107 = $$3;
        let tmpIfTest$109 = $$4;
        debugger;
        $(3);
        const tmpReturnArg$33 = tmpBranchingC$9(tmpSwitchValue$31, tmpSwitchCaseToStart$31, tmpIfTest$105, tmpIfTest$107, tmpIfTest$109);
        return tmpReturnArg$33;
      };
      const tmpBranchingB$9 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$33 = $$0;
        let tmpSwitchCaseToStart$33 = $$1;
        let tmpIfTest$111 = $$2;
        let tmpIfTest$113 = $$3;
        let tmpIfTest$115 = $$4;
        debugger;
        const tmpReturnArg$35 = tmpBranchingC$9(tmpSwitchValue$33, tmpSwitchCaseToStart$33, tmpIfTest$111, tmpIfTest$113, tmpIfTest$115);
        return tmpReturnArg$35;
      };
      const tmpBranchingC$9 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$35 = $$0;
        let tmpSwitchCaseToStart$35 = $$1;
        let tmpIfTest$117 = $$2;
        let tmpIfTest$119 = $$3;
        let tmpIfTest$121 = $$4;
        debugger;
        const tmpIfTest$123 = tmpSwitchCaseToStart$35 <= 2;
        const tmpBranchingA$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$37 = $$0;
          let tmpSwitchCaseToStart$37 = $$1;
          let tmpIfTest$127 = $$2;
          let tmpIfTest$129 = $$3;
          let tmpIfTest$131 = $$4;
          let tmpIfTest$133 = $$5;
          debugger;
          $(5);
          const tmpReturnArg$37 = $(6);
          return tmpReturnArg$37;
        };
        const tmpBranchingB$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$39 = $$0;
          let tmpSwitchCaseToStart$39 = $$1;
          let tmpIfTest$135 = $$2;
          let tmpIfTest$137 = $$3;
          let tmpIfTest$139 = $$4;
          let tmpIfTest$141 = $$5;
          debugger;
          const tmpIfTest$143 = tmpSwitchCaseToStart$39 <= 3;
          const tmpBranchingA$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$43 = $$0;
            let tmpSwitchCaseToStart$43 = $$1;
            let tmpIfTest$153 = $$2;
            let tmpIfTest$155 = $$3;
            let tmpIfTest$157 = $$4;
            let tmpIfTest$159 = $$5;
            let tmpIfTest$161 = $$6;
            debugger;
          };
          const tmpBranchingB$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$45 = $$0;
            let tmpSwitchCaseToStart$45 = $$1;
            let tmpIfTest$163 = $$2;
            let tmpIfTest$165 = $$3;
            let tmpIfTest$167 = $$4;
            let tmpIfTest$169 = $$5;
            let tmpIfTest$171 = $$6;
            debugger;
            const tmpReturnArg$39 = tmpBranchingC$13(
              tmpSwitchValue$45,
              tmpSwitchCaseToStart$45,
              tmpIfTest$163,
              tmpIfTest$165,
              tmpIfTest$167,
              tmpIfTest$169,
              tmpIfTest$171,
            );
            return tmpReturnArg$39;
          };
          const tmpBranchingC$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$47 = $$0;
            let tmpSwitchCaseToStart$47 = $$1;
            let tmpIfTest$173 = $$2;
            let tmpIfTest$175 = $$3;
            let tmpIfTest$177 = $$4;
            let tmpIfTest$179 = $$5;
            let tmpIfTest$181 = $$6;
            debugger;
            const tmpReturnArg$41 = tmpBranchingC$11(
              tmpSwitchValue$47,
              tmpSwitchCaseToStart$47,
              tmpIfTest$173,
              tmpIfTest$175,
              tmpIfTest$177,
              tmpIfTest$179,
            );
            return tmpReturnArg$41;
          };
          if (tmpIfTest$143) {
            const tmpReturnArg$43 = tmpBranchingA$13(
              tmpSwitchValue$39,
              tmpSwitchCaseToStart$39,
              tmpIfTest$135,
              tmpIfTest$137,
              tmpIfTest$139,
              tmpIfTest$141,
              tmpIfTest$143,
            );
            return tmpReturnArg$43;
          } else {
            const tmpReturnArg$45 = tmpBranchingB$13(
              tmpSwitchValue$39,
              tmpSwitchCaseToStart$39,
              tmpIfTest$135,
              tmpIfTest$137,
              tmpIfTest$139,
              tmpIfTest$141,
              tmpIfTest$143,
            );
            return tmpReturnArg$45;
          }
        };
        const tmpBranchingC$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$41 = $$0;
          let tmpSwitchCaseToStart$41 = $$1;
          let tmpIfTest$145 = $$2;
          let tmpIfTest$147 = $$3;
          let tmpIfTest$149 = $$4;
          let tmpIfTest$151 = $$5;
          debugger;
          const tmpReturnArg$47 = tmpBranchingC$7(tmpSwitchValue$41, tmpSwitchCaseToStart$41, tmpIfTest$145, tmpIfTest$147);
          return tmpReturnArg$47;
        };
        if (tmpIfTest$123) {
          const tmpReturnArg$49 = tmpBranchingA$11(
            tmpSwitchValue$35,
            tmpSwitchCaseToStart$35,
            tmpIfTest$117,
            tmpIfTest$119,
            tmpIfTest$121,
            tmpIfTest$123,
          );
          return tmpReturnArg$49;
        } else {
          const tmpReturnArg$51 = tmpBranchingB$11(
            tmpSwitchValue$35,
            tmpSwitchCaseToStart$35,
            tmpIfTest$117,
            tmpIfTest$119,
            tmpIfTest$121,
            tmpIfTest$123,
          );
          return tmpReturnArg$51;
        }
      };
      if (tmpIfTest$95) {
        const tmpReturnArg$53 = tmpBranchingA$9(tmpSwitchValue$27, tmpSwitchCaseToStart$27, tmpIfTest$91, tmpIfTest$93, tmpIfTest$95);
        return tmpReturnArg$53;
      } else {
        const tmpReturnArg$55 = tmpBranchingB$9(tmpSwitchValue$27, tmpSwitchCaseToStart$27, tmpIfTest$91, tmpIfTest$93, tmpIfTest$95);
        return tmpReturnArg$55;
      }
    };
    const tmpBranchingC$7 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$29 = $$0;
      let tmpSwitchCaseToStart$29 = $$1;
      let tmpIfTest$101 = $$2;
      let tmpIfTest$103 = $$3;
      debugger;
    };
    if (tmpIfTest$79) {
      const tmpReturnArg$57 = tmpBranchingA$7(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$17, tmpIfTest$79);
      return tmpReturnArg$57;
    } else {
      const tmpReturnArg$59 = tmpBranchingB$7(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$17, tmpIfTest$79);
      return tmpReturnArg$59;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$61 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$61;
  } else {
    const tmpReturnArg$63 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$63;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingB = function ($$0) {
  const tmpSwitchValue$3 = $$0;
  debugger;
  const tmpBinLhs$5 = $(1);
  const tmpIfTest$11 = tmpBinLhs$5 === tmpSwitchValue$3;
  if (tmpIfTest$11) {
    $(3);
    $(5);
    const tmpReturnArg$9 = $(6);
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$25 = tmpBranchingB$1(tmpSwitchValue$3);
    return tmpReturnArg$25;
  }
};
const tmpBranchingB$1 = function ($$0) {
  const tmpSwitchValue$9 = $$0;
  debugger;
  const tmpBinLhs$15 = $(4);
  const tmpIfTest$27 = tmpBinLhs$15 === tmpSwitchValue$9;
  if (tmpIfTest$27) {
    $(5);
    const tmpReturnArg$18 = $(6);
    return tmpReturnArg$18;
  } else {
    const tmpReturnArg$19 = tmpBranchingB$3(tmpSwitchValue$9);
    return tmpReturnArg$19;
  }
};
const tmpBranchingB$3 = function ($$0) {
  const tmpSwitchValue$15 = $$0;
  debugger;
  const tmpBinLhs$29 = $(7);
  const tmpIfTest$47 = tmpBinLhs$29 === tmpSwitchValue$15;
  if (tmpIfTest$47) {
    return undefined;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpSwitchValue = $(1);
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    $(2);
    return undefined;
  } else {
    const tmpReturnArg$63 = tmpBranchingB(tmpSwitchValue);
    return tmpReturnArg$63;
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
 - 3: 3
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
