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
    const tmpLabeledBlockFunc = function ($$0, $$1, $$2) {
      let tmpSwitchValue$27 = $$0;
      let tmpSwitchCaseToStart$27 = $$1;
      let tmpIfTest$89 = $$2;
      debugger;
      const tmpIfTest$91 = tmpSwitchCaseToStart$27 <= 0;
      const tmpBranchingA$7 = function ($$0, $$1, $$2, $$3) {
        let tmpSwitchValue$29 = $$0;
        let tmpSwitchCaseToStart$29 = $$1;
        let tmpIfTest$99 = $$2;
        let tmpIfTest$101 = $$3;
        debugger;
        $(2);
        const tmpReturnArg$35 = tmpAfterLabel(tmpSwitchValue$29, tmpSwitchCaseToStart$29, tmpIfTest$99);
        return tmpReturnArg$35;
      };
      const tmpBranchingB$7 = function ($$0, $$1, $$2, $$3) {
        let tmpSwitchValue$31 = $$0;
        let tmpSwitchCaseToStart$31 = $$1;
        let tmpIfTest$103 = $$2;
        let tmpIfTest$105 = $$3;
        debugger;
        const tmpIfTest$107 = tmpSwitchCaseToStart$31 <= 1;
        const tmpBranchingA$9 = function ($$0, $$1, $$2, $$3, $$4) {
          let tmpSwitchValue$35 = $$0;
          let tmpSwitchCaseToStart$35 = $$1;
          let tmpIfTest$117 = $$2;
          let tmpIfTest$119 = $$3;
          let tmpIfTest$121 = $$4;
          debugger;
          $(3);
          const tmpReturnArg$45 = tmpBranchingC$9(tmpSwitchValue$35, tmpSwitchCaseToStart$35, tmpIfTest$117, tmpIfTest$119, tmpIfTest$121);
          return tmpReturnArg$45;
        };
        const tmpBranchingB$9 = function ($$0, $$1, $$2, $$3, $$4) {
          let tmpSwitchValue$37 = $$0;
          let tmpSwitchCaseToStart$37 = $$1;
          let tmpIfTest$123 = $$2;
          let tmpIfTest$125 = $$3;
          let tmpIfTest$127 = $$4;
          debugger;
          const tmpReturnArg$47 = tmpBranchingC$9(tmpSwitchValue$37, tmpSwitchCaseToStart$37, tmpIfTest$123, tmpIfTest$125, tmpIfTest$127);
          return tmpReturnArg$47;
        };
        const tmpBranchingC$9 = function ($$0, $$1, $$2, $$3, $$4) {
          let tmpSwitchValue$39 = $$0;
          let tmpSwitchCaseToStart$39 = $$1;
          let tmpIfTest$129 = $$2;
          let tmpIfTest$131 = $$3;
          let tmpIfTest$133 = $$4;
          debugger;
          const tmpIfTest$135 = tmpSwitchCaseToStart$39 <= 2;
          const tmpBranchingA$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
            let tmpSwitchValue$41 = $$0;
            let tmpSwitchCaseToStart$41 = $$1;
            let tmpIfTest$139 = $$2;
            let tmpIfTest$141 = $$3;
            let tmpIfTest$143 = $$4;
            let tmpIfTest$145 = $$5;
            debugger;
            $(5);
            const tmpReturnArg$49 = $(6);
            return tmpReturnArg$49;
          };
          const tmpBranchingB$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
            let tmpSwitchValue$43 = $$0;
            let tmpSwitchCaseToStart$43 = $$1;
            let tmpIfTest$147 = $$2;
            let tmpIfTest$149 = $$3;
            let tmpIfTest$151 = $$4;
            let tmpIfTest$153 = $$5;
            debugger;
            const tmpIfTest$155 = tmpSwitchCaseToStart$43 <= 3;
            const tmpBranchingA$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
              let tmpSwitchValue$47 = $$0;
              let tmpSwitchCaseToStart$47 = $$1;
              let tmpIfTest$165 = $$2;
              let tmpIfTest$167 = $$3;
              let tmpIfTest$169 = $$4;
              let tmpIfTest$171 = $$5;
              let tmpIfTest$173 = $$6;
              debugger;
              const tmpReturnArg$53 = tmpAfterLabel(tmpSwitchValue$47, tmpSwitchCaseToStart$47, tmpIfTest$165);
              return tmpReturnArg$53;
            };
            const tmpBranchingB$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
              let tmpSwitchValue$49 = $$0;
              let tmpSwitchCaseToStart$49 = $$1;
              let tmpIfTest$175 = $$2;
              let tmpIfTest$177 = $$3;
              let tmpIfTest$179 = $$4;
              let tmpIfTest$181 = $$5;
              let tmpIfTest$183 = $$6;
              debugger;
              const tmpReturnArg$55 = tmpBranchingC$13(
                tmpSwitchValue$49,
                tmpSwitchCaseToStart$49,
                tmpIfTest$175,
                tmpIfTest$177,
                tmpIfTest$179,
                tmpIfTest$181,
                tmpIfTest$183,
              );
              return tmpReturnArg$55;
            };
            const tmpBranchingC$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
              let tmpSwitchValue$51 = $$0;
              let tmpSwitchCaseToStart$51 = $$1;
              let tmpIfTest$185 = $$2;
              let tmpIfTest$187 = $$3;
              let tmpIfTest$189 = $$4;
              let tmpIfTest$191 = $$5;
              let tmpIfTest$193 = $$6;
              debugger;
              const tmpReturnArg$57 = tmpBranchingC$11(
                tmpSwitchValue$51,
                tmpSwitchCaseToStart$51,
                tmpIfTest$185,
                tmpIfTest$187,
                tmpIfTest$189,
                tmpIfTest$191,
              );
              return tmpReturnArg$57;
            };
            if (tmpIfTest$155) {
              const tmpReturnArg$59 = tmpBranchingA$13(
                tmpSwitchValue$43,
                tmpSwitchCaseToStart$43,
                tmpIfTest$147,
                tmpIfTest$149,
                tmpIfTest$151,
                tmpIfTest$153,
                tmpIfTest$155,
              );
              return tmpReturnArg$59;
            } else {
              const tmpReturnArg$61 = tmpBranchingB$13(
                tmpSwitchValue$43,
                tmpSwitchCaseToStart$43,
                tmpIfTest$147,
                tmpIfTest$149,
                tmpIfTest$151,
                tmpIfTest$153,
                tmpIfTest$155,
              );
              return tmpReturnArg$61;
            }
          };
          const tmpBranchingC$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
            let tmpSwitchValue$45 = $$0;
            let tmpSwitchCaseToStart$45 = $$1;
            let tmpIfTest$157 = $$2;
            let tmpIfTest$159 = $$3;
            let tmpIfTest$161 = $$4;
            let tmpIfTest$163 = $$5;
            debugger;
            const tmpReturnArg$63 = tmpBranchingC$7(tmpSwitchValue$45, tmpSwitchCaseToStart$45, tmpIfTest$157, tmpIfTest$159);
            return tmpReturnArg$63;
          };
          if (tmpIfTest$135) {
            const tmpReturnArg$65 = tmpBranchingA$11(
              tmpSwitchValue$39,
              tmpSwitchCaseToStart$39,
              tmpIfTest$129,
              tmpIfTest$131,
              tmpIfTest$133,
              tmpIfTest$135,
            );
            return tmpReturnArg$65;
          } else {
            const tmpReturnArg$67 = tmpBranchingB$11(
              tmpSwitchValue$39,
              tmpSwitchCaseToStart$39,
              tmpIfTest$129,
              tmpIfTest$131,
              tmpIfTest$133,
              tmpIfTest$135,
            );
            return tmpReturnArg$67;
          }
        };
        if (tmpIfTest$107) {
          const tmpReturnArg$69 = tmpBranchingA$9(tmpSwitchValue$31, tmpSwitchCaseToStart$31, tmpIfTest$103, tmpIfTest$105, tmpIfTest$107);
          return tmpReturnArg$69;
        } else {
          const tmpReturnArg$71 = tmpBranchingB$9(tmpSwitchValue$31, tmpSwitchCaseToStart$31, tmpIfTest$103, tmpIfTest$105, tmpIfTest$107);
          return tmpReturnArg$71;
        }
      };
      const tmpBranchingC$7 = function ($$0, $$1, $$2, $$3) {
        let tmpSwitchValue$33 = $$0;
        let tmpSwitchCaseToStart$33 = $$1;
        let tmpIfTest$113 = $$2;
        let tmpIfTest$115 = $$3;
        debugger;
        const tmpReturnArg$73 = tmpAfterLabel(tmpSwitchValue$33, tmpSwitchCaseToStart$33, tmpIfTest$113);
        return tmpReturnArg$73;
      };
      if (tmpIfTest$91) {
        const tmpReturnArg$75 = tmpBranchingA$7(tmpSwitchValue$27, tmpSwitchCaseToStart$27, tmpIfTest$89, tmpIfTest$91);
        return tmpReturnArg$75;
      } else {
        const tmpReturnArg$77 = tmpBranchingB$7(tmpSwitchValue$27, tmpSwitchCaseToStart$27, tmpIfTest$89, tmpIfTest$91);
        return tmpReturnArg$77;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2) {
      let tmpSwitchValue$25 = $$0;
      let tmpSwitchCaseToStart$25 = $$1;
      let tmpIfTest$87 = $$2;
      debugger;
      $('after');
    };
    const tmpReturnArg$79 = tmpLabeledBlockFunc(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$17);
    return tmpReturnArg$79;
  };
  if (tmpIfTest) {
    const tmpReturnArg$81 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$81;
  } else {
    const tmpReturnArg$83 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$83;
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
    const tmpReturnArg$2 = $(6);
    return tmpReturnArg$2;
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
    const tmpReturnArg$8 = $(6);
    return tmpReturnArg$8;
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
    $('after');
    return undefined;
  } else {
    $('after');
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpSwitchValue = $(7);
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    $(2);
    $('after');
    return undefined;
  } else {
    const tmpReturnArg$83 = tmpBranchingB(tmpSwitchValue);
    return tmpReturnArg$83;
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
