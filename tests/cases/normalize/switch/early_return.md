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
  const tmpBranchingA = function () {
    debugger;
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpBinLhs$5 = $(1);
    const tmpIfTest$7 = tmpBinLhs$5 === tmpSwitchValue;
    const tmpBranchingA$1 = function () {
      debugger;
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpBinLhs$11 = $(4);
      const tmpIfTest$13 = tmpBinLhs$11 === tmpSwitchValue;
      const tmpBranchingA$3 = function () {
        debugger;
        tmpSwitchCaseToStart = 2;
        const tmpReturnArg$3 = tmpBranchingC$3();
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpBinLhs$15 = $(7);
        const tmpIfTest$17 = tmpBinLhs$15 === tmpSwitchValue;
        const tmpBranchingA$5 = function () {
          debugger;
          tmpSwitchCaseToStart = 3;
          const tmpReturnArg$5 = tmpBranchingC$5();
          return tmpReturnArg$5;
        };
        const tmpBranchingB$5 = function () {
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$5();
          return tmpReturnArg$7;
        };
        const tmpBranchingC$5 = function () {
          debugger;
          const tmpReturnArg$9 = tmpBranchingC$3();
          return tmpReturnArg$9;
        };
        if (tmpIfTest$17) {
          const tmpReturnArg$11 = tmpBranchingA$5();
          return tmpReturnArg$11;
        } else {
          const tmpReturnArg$13 = tmpBranchingB$5();
          return tmpReturnArg$13;
        }
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$15 = tmpBranchingC$1();
        return tmpReturnArg$15;
      };
      if (tmpIfTest$13) {
        const tmpReturnArg$17 = tmpBranchingA$3();
        return tmpReturnArg$17;
      } else {
        const tmpReturnArg$19 = tmpBranchingB$3();
        return tmpReturnArg$19;
      }
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$21 = tmpBranchingC();
      return tmpReturnArg$21;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$23 = tmpBranchingA$1();
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1();
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$19 = tmpSwitchCaseToStart <= 0;
    const tmpBranchingA$7 = function () {
      debugger;
      $(2);
      return undefined;
    };
    const tmpBranchingB$7 = function () {
      debugger;
      const tmpIfTest$27 = tmpSwitchCaseToStart <= 1;
      const tmpBranchingA$9 = function () {
        debugger;
        $(3);
        const tmpReturnArg$33 = tmpBranchingC$9();
        return tmpReturnArg$33;
      };
      const tmpBranchingB$9 = function () {
        debugger;
        const tmpReturnArg$35 = tmpBranchingC$9();
        return tmpReturnArg$35;
      };
      const tmpBranchingC$9 = function () {
        debugger;
        tmpIfTest$29 = tmpSwitchCaseToStart <= 2;
        const tmpBranchingA$11 = function () {
          debugger;
          $(5);
          const tmpReturnArg$37 = $(6);
          return tmpReturnArg$37;
        };
        const tmpBranchingB$11 = function () {
          debugger;
          const tmpIfTest$35 = tmpSwitchCaseToStart <= 3;
          const tmpBranchingA$13 = function () {
            debugger;
            return undefined;
          };
          const tmpBranchingB$13 = function () {
            debugger;
            const tmpReturnArg$39 = tmpBranchingC$13();
            return tmpReturnArg$39;
          };
          const tmpBranchingC$13 = function () {
            debugger;
            const tmpReturnArg$41 = tmpBranchingC$11();
            return tmpReturnArg$41;
          };
          if (tmpIfTest$35) {
            const tmpReturnArg$43 = tmpBranchingA$13();
            return tmpReturnArg$43;
          } else {
            const tmpReturnArg$45 = tmpBranchingB$13();
            return tmpReturnArg$45;
          }
        };
        const tmpBranchingC$11 = function () {
          debugger;
          const tmpReturnArg$47 = tmpBranchingC$7();
          return tmpReturnArg$47;
        };
        if (tmpIfTest$29) {
          const tmpReturnArg$49 = tmpBranchingA$11();
          return tmpReturnArg$49;
        } else {
          const tmpReturnArg$51 = tmpBranchingB$11();
          return tmpReturnArg$51;
        }
      };
      let tmpIfTest$29 = undefined;
      if (tmpIfTest$27) {
        const tmpReturnArg$53 = tmpBranchingA$9();
        return tmpReturnArg$53;
      } else {
        const tmpReturnArg$55 = tmpBranchingB$9();
        return tmpReturnArg$55;
      }
    };
    const tmpBranchingC$7 = function () {
      debugger;
      return undefined;
    };
    if (tmpIfTest$19) {
      const tmpReturnArg$57 = tmpBranchingA$7();
      return tmpReturnArg$57;
    } else {
      const tmpReturnArg$59 = tmpBranchingB$7();
      return tmpReturnArg$59;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$61 = tmpBranchingA();
    return tmpReturnArg$61;
  } else {
    const tmpReturnArg$63 = tmpBranchingB();
    return tmpReturnArg$63;
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
  const tmpBranchingC$9 = function () {
    debugger;
    const tmpssa2_tmpIfTest$29 = tmpSwitchCaseToStart <= 2;
    if (tmpssa2_tmpIfTest$29) {
      $(5);
      const tmpReturnArg$37 = $(6);
      return tmpReturnArg$37;
    } else {
      tmpSwitchCaseToStart <= 3;
      return undefined;
    }
  };
  const tmpBranchingB$7 = function () {
    debugger;
    const tmpIfTest$27 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$27) {
      $(3);
      const tmpReturnArg$33 = tmpBranchingC$9();
      return tmpReturnArg$33;
    } else {
      const tmpReturnArg$55 = tmpBranchingC$9();
      return tmpReturnArg$55;
    }
  };
  const tmpBranchingB$3 = function () {
    debugger;
    const tmpBinLhs$15 = $(7);
    const tmpIfTest$17 = tmpBinLhs$15 === tmpSwitchValue;
    if (tmpIfTest$17) {
      tmpSwitchCaseToStart = 3;
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$13 = tmpBranchingC();
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingB$1 = function () {
    debugger;
    const tmpBinLhs$11 = $(4);
    const tmpIfTest$13 = tmpBinLhs$11 === tmpSwitchValue;
    if (tmpIfTest$13) {
      tmpSwitchCaseToStart = 2;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$19 = tmpBranchingB$3();
      return tmpReturnArg$19;
    }
  };
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingB = function () {
    debugger;
    const tmpBinLhs$5 = $(1);
    const tmpIfTest$7 = tmpBinLhs$5 === tmpSwitchValue;
    if (tmpIfTest$7) {
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1();
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$19 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$19) {
      $(2);
      return undefined;
    } else {
      const tmpReturnArg$59 = tmpBranchingB$7();
      return tmpReturnArg$59;
    }
  };
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$63 = tmpBranchingB();
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
