# Preval test case

# switch_all.md

> Normalize > Dce > Return > Switch all
>
> Any statements that follow a return in the same parent should be eliminated.

If all switch cases return, including a default, then the code after a switch is dead code.

Simple case to check whether the switch transform doesn't prevent this.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
      $('eliminate');
    case $(1):
      $('keep, eval');
      return;
      $('eliminate');
    default:
      $('keep, do not eval');
      return $(2, 'ret');
      $('eliminate');
  }
  $('eliminate after switch');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 2;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $('keep, do not eval');
        return;
        $('eliminate');
      }
      if (tmpSwitchCaseToStart <= 1) {
        $('keep, eval');
        return;
        $('eliminate');
      }
      if (tmpSwitchCaseToStart <= 2) {
        $('keep, do not eval');
        return $(2, 'ret');
        $('eliminate');
      }
    }
  }
  $('eliminate after switch');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 2;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpBinLhs$3, tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpBinLhs$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpBinLhs$7 = $(1);
    const tmpIfTest$7 = tmpBinLhs$7 === tmpSwitchValue$3;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpBinLhs$11 = $$2;
      let tmpIfTest$11 = $$3;
      let tmpBinLhs$13 = $$4;
      let tmpIfTest$13 = $$5;
      debugger;
      tmpSwitchCaseToStart$7 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpSwitchValue$7,
        tmpSwitchCaseToStart$7,
        tmpBinLhs$11,
        tmpIfTest$11,
        tmpBinLhs$13,
        tmpIfTest$13,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpSwitchValue$9 = $$0;
      let tmpSwitchCaseToStart$9 = $$1;
      let tmpBinLhs$15 = $$2;
      let tmpIfTest$15 = $$3;
      let tmpBinLhs$17 = $$4;
      let tmpIfTest$17 = $$5;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpSwitchValue$9,
        tmpSwitchCaseToStart$9,
        tmpBinLhs$15,
        tmpIfTest$15,
        tmpBinLhs$17,
        tmpIfTest$17,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpSwitchValue$11 = $$0;
      let tmpSwitchCaseToStart$11 = $$1;
      let tmpBinLhs$19 = $$2;
      let tmpIfTest$19 = $$3;
      let tmpBinLhs$21 = $$4;
      let tmpIfTest$21 = $$5;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpBinLhs$19, tmpIfTest$19);
      return tmpReturnArg$5;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$5, tmpIfTest$5, tmpBinLhs$7, tmpIfTest$7);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$5, tmpIfTest$5, tmpBinLhs$7, tmpIfTest$7);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$5 = $$0;
    let tmpSwitchCaseToStart$5 = $$1;
    let tmpBinLhs$9 = $$2;
    let tmpIfTest$9 = $$3;
    debugger;
    const tmpLabeledBlockFunc = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$15 = $$0;
      let tmpSwitchCaseToStart$15 = $$1;
      let tmpBinLhs$25 = $$2;
      let tmpIfTest$31 = $$3;
      debugger;
      const tmpIfTest$33 = tmpSwitchCaseToStart$15 <= 0;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$17 = $$0;
        let tmpSwitchCaseToStart$17 = $$1;
        let tmpBinLhs$27 = $$2;
        let tmpIfTest$39 = $$3;
        let tmpIfTest$41 = $$4;
        debugger;
        $('keep, do not eval');
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$19 = $$0;
        let tmpSwitchCaseToStart$19 = $$1;
        let tmpBinLhs$29 = $$2;
        let tmpIfTest$43 = $$3;
        let tmpIfTest$45 = $$4;
        debugger;
        const tmpIfTest$47 = tmpSwitchCaseToStart$19 <= 1;
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$23 = $$0;
          let tmpSwitchCaseToStart$23 = $$1;
          let tmpBinLhs$33 = $$2;
          let tmpIfTest$55 = $$3;
          let tmpIfTest$57 = $$4;
          let tmpIfTest$59 = $$5;
          debugger;
          $('keep, eval');
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$25 = $$0;
          let tmpSwitchCaseToStart$25 = $$1;
          let tmpBinLhs$35 = $$2;
          let tmpIfTest$61 = $$3;
          let tmpIfTest$63 = $$4;
          let tmpIfTest$65 = $$5;
          debugger;
          const tmpIfTest$67 = tmpSwitchCaseToStart$25 <= 2;
          const tmpBranchingA$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$29 = $$0;
            let tmpSwitchCaseToStart$29 = $$1;
            let tmpBinLhs$39 = $$2;
            let tmpIfTest$75 = $$3;
            let tmpIfTest$77 = $$4;
            let tmpIfTest$79 = $$5;
            let tmpIfTest$81 = $$6;
            debugger;
            $('keep, do not eval');
            const tmpReturnArg$19 = $(2, 'ret');
            return tmpReturnArg$19;
          };
          const tmpBranchingB$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$31 = $$0;
            let tmpSwitchCaseToStart$31 = $$1;
            let tmpBinLhs$41 = $$2;
            let tmpIfTest$83 = $$3;
            let tmpIfTest$85 = $$4;
            let tmpIfTest$87 = $$5;
            let tmpIfTest$89 = $$6;
            debugger;
            const tmpReturnArg$21 = tmpBranchingC$7(
              tmpSwitchValue$31,
              tmpSwitchCaseToStart$31,
              tmpBinLhs$41,
              tmpIfTest$83,
              tmpIfTest$85,
              tmpIfTest$87,
              tmpIfTest$89,
            );
            return tmpReturnArg$21;
          };
          const tmpBranchingC$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$33 = $$0;
            let tmpSwitchCaseToStart$33 = $$1;
            let tmpBinLhs$43 = $$2;
            let tmpIfTest$91 = $$3;
            let tmpIfTest$93 = $$4;
            let tmpIfTest$95 = $$5;
            let tmpIfTest$97 = $$6;
            debugger;
            const tmpReturnArg$23 = tmpBranchingC$5(
              tmpSwitchValue$33,
              tmpSwitchCaseToStart$33,
              tmpBinLhs$43,
              tmpIfTest$91,
              tmpIfTest$93,
              tmpIfTest$95,
            );
            return tmpReturnArg$23;
          };
          if (tmpIfTest$67) {
            const tmpReturnArg$25 = tmpBranchingA$7(
              tmpSwitchValue$25,
              tmpSwitchCaseToStart$25,
              tmpBinLhs$35,
              tmpIfTest$61,
              tmpIfTest$63,
              tmpIfTest$65,
              tmpIfTest$67,
            );
            return tmpReturnArg$25;
          } else {
            const tmpReturnArg$27 = tmpBranchingB$7(
              tmpSwitchValue$25,
              tmpSwitchCaseToStart$25,
              tmpBinLhs$35,
              tmpIfTest$61,
              tmpIfTest$63,
              tmpIfTest$65,
              tmpIfTest$67,
            );
            return tmpReturnArg$27;
          }
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$27 = $$0;
          let tmpSwitchCaseToStart$27 = $$1;
          let tmpBinLhs$37 = $$2;
          let tmpIfTest$69 = $$3;
          let tmpIfTest$71 = $$4;
          let tmpIfTest$73 = $$5;
          debugger;
          const tmpReturnArg$29 = tmpBranchingC$3(tmpSwitchValue$27, tmpSwitchCaseToStart$27, tmpBinLhs$37, tmpIfTest$69, tmpIfTest$71);
          return tmpReturnArg$29;
        };
        if (tmpIfTest$47) {
          const tmpReturnArg$31 = tmpBranchingA$5(
            tmpSwitchValue$19,
            tmpSwitchCaseToStart$19,
            tmpBinLhs$29,
            tmpIfTest$43,
            tmpIfTest$45,
            tmpIfTest$47,
          );
          return tmpReturnArg$31;
        } else {
          const tmpReturnArg$33 = tmpBranchingB$5(
            tmpSwitchValue$19,
            tmpSwitchCaseToStart$19,
            tmpBinLhs$29,
            tmpIfTest$43,
            tmpIfTest$45,
            tmpIfTest$47,
          );
          return tmpReturnArg$33;
        }
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$21 = $$0;
        let tmpSwitchCaseToStart$21 = $$1;
        let tmpBinLhs$31 = $$2;
        let tmpIfTest$51 = $$3;
        let tmpIfTest$53 = $$4;
        debugger;
        const tmpReturnArg$35 = tmpAfterLabel(tmpSwitchValue$21, tmpSwitchCaseToStart$21, tmpBinLhs$31, tmpIfTest$51);
        return tmpReturnArg$35;
      };
      if (tmpIfTest$33) {
        const tmpReturnArg$37 = tmpBranchingA$3(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpBinLhs$25, tmpIfTest$31, tmpIfTest$33);
        return tmpReturnArg$37;
      } else {
        const tmpReturnArg$39 = tmpBranchingB$3(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpBinLhs$25, tmpIfTest$31, tmpIfTest$33);
        return tmpReturnArg$39;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$13 = $$0;
      let tmpSwitchCaseToStart$13 = $$1;
      let tmpBinLhs$23 = $$2;
      let tmpIfTest$29 = $$3;
      debugger;
      $('eliminate after switch');
    };
    const tmpReturnArg$41 = tmpLabeledBlockFunc(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$9, tmpIfTest$9);
    return tmpReturnArg$41;
  };
  if (tmpIfTest) {
    const tmpReturnArg$43 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$43;
  } else {
    const tmpReturnArg$45 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$45;
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
  const tmpSwitchValue = $(1, 'disc');
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingB = function ($$0) {
    const tmpSwitchValue$3 = $$0;
    debugger;
    const tmpBinLhs$7 = $(1);
    const tmpIfTest$7 = tmpBinLhs$7 === tmpSwitchValue$3;
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingC(1);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingC(2);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function ($$0) {
    const tmpSwitchCaseToStart$5 = $$0;
    debugger;
    const tmpIfTest$33 = tmpSwitchCaseToStart$5 <= 0;
    const tmpBranchingB$3 = function ($$0) {
      const tmpSwitchCaseToStart$19 = $$0;
      debugger;
      const tmpIfTest$47 = tmpSwitchCaseToStart$19 <= 1;
      const tmpBranchingB$5 = function ($$0) {
        const tmpSwitchCaseToStart$25 = $$0;
        debugger;
        const tmpIfTest$67 = tmpSwitchCaseToStart$25 <= 2;
        if (tmpIfTest$67) {
          $('keep, do not eval');
          const tmpReturnArg$19 = $(2, 'ret');
          return tmpReturnArg$19;
        } else {
          $('eliminate after switch');
          return undefined;
        }
      };
      if (tmpIfTest$47) {
        $('keep, eval');
        return undefined;
      } else {
        const tmpReturnArg$33 = tmpBranchingB$5(tmpSwitchCaseToStart$19);
        return tmpReturnArg$33;
      }
    };
    if (tmpIfTest$33) {
      $('keep, do not eval');
      return undefined;
    } else {
      const tmpReturnArg$3 = tmpBranchingB$3(tmpSwitchCaseToStart$5);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$43 = tmpBranchingC(0);
    return tmpReturnArg$43;
  } else {
    const tmpReturnArg$45 = tmpBranchingB(tmpSwitchValue);
    return tmpReturnArg$45;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 1
 - 4: 'keep, eval'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
