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
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 2;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingA = function (tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpBinLhs$2, tmpIfTest$2) {
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpBinLhs$2, tmpIfTest$2);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$3, tmpIfTest$3) {
    const tmpBinLhs$4 = $(1);
    const tmpIfTest$4 = tmpBinLhs$4 === tmpSwitchValue$2;
    const tmpBranchingA$1 = function (tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpBinLhs$6, tmpIfTest$6, tmpBinLhs$7, tmpIfTest$7) {
      tmpSwitchCaseToStart$4 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpBinLhs$6, tmpIfTest$6, tmpBinLhs$7, tmpIfTest$7);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$8, tmpIfTest$8, tmpBinLhs$9, tmpIfTest$9) {
      const tmpReturnArg$2 = tmpBranchingC$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$8, tmpIfTest$8, tmpBinLhs$9, tmpIfTest$9);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function (tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpBinLhs$10, tmpIfTest$10, tmpBinLhs$11, tmpIfTest$11) {
      const tmpReturnArg$3 = tmpBranchingC(tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpBinLhs$10, tmpIfTest$10);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$3, tmpIfTest$3, tmpBinLhs$4, tmpIfTest$4);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$3, tmpIfTest$3, tmpBinLhs$4, tmpIfTest$4);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function (tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$5, tmpIfTest$5) {
    const tmpBranchingC$2 = function (tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpBinLhs$12, tmpIfTest$15) {
      $('eliminate after switch');
    };
    const tmpLabeledBlockFunc = function (tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$13, tmpIfTest$16) {
      const tmpIfTest$17 = tmpSwitchCaseToStart$8 <= 0;
      const tmpBranchingA$2 = function (tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$14, tmpIfTest$20, tmpIfTest$21) {
        $('keep, do not eval');
      };
      const tmpBranchingB$2 = function (tmpSwitchValue$10, tmpSwitchCaseToStart$10, tmpBinLhs$15, tmpIfTest$22, tmpIfTest$23) {
        const tmpIfTest$24 = tmpSwitchCaseToStart$10 <= 1;
        const tmpBranchingA$3 = function (
          tmpSwitchValue$12,
          tmpSwitchCaseToStart$12,
          tmpBinLhs$17,
          tmpIfTest$28,
          tmpIfTest$29,
          tmpIfTest$30,
        ) {
          $('keep, eval');
        };
        const tmpBranchingB$3 = function (
          tmpSwitchValue$13,
          tmpSwitchCaseToStart$13,
          tmpBinLhs$18,
          tmpIfTest$31,
          tmpIfTest$32,
          tmpIfTest$33,
        ) {
          const tmpIfTest$34 = tmpSwitchCaseToStart$13 <= 2;
          const tmpBranchingA$4 = function (
            tmpSwitchValue$15,
            tmpSwitchCaseToStart$15,
            tmpBinLhs$20,
            tmpIfTest$38,
            tmpIfTest$39,
            tmpIfTest$40,
            tmpIfTest$41,
          ) {
            $('keep, do not eval');
            const tmpReturnArg$10 = $(2, 'ret');
            return tmpReturnArg$10;
          };
          const tmpBranchingB$4 = function (
            tmpSwitchValue$16,
            tmpSwitchCaseToStart$16,
            tmpBinLhs$21,
            tmpIfTest$42,
            tmpIfTest$43,
            tmpIfTest$44,
            tmpIfTest$45,
          ) {
            const tmpReturnArg$11 = tmpBranchingC$5(
              tmpSwitchValue$16,
              tmpSwitchCaseToStart$16,
              tmpBinLhs$21,
              tmpIfTest$42,
              tmpIfTest$43,
              tmpIfTest$44,
              tmpIfTest$45,
            );
            return tmpReturnArg$11;
          };
          const tmpBranchingC$5 = function (
            tmpSwitchValue$17,
            tmpSwitchCaseToStart$17,
            tmpBinLhs$22,
            tmpIfTest$46,
            tmpIfTest$47,
            tmpIfTest$48,
            tmpIfTest$49,
          ) {
            const tmpReturnArg$12 = tmpBranchingC$4(
              tmpSwitchValue$17,
              tmpSwitchCaseToStart$17,
              tmpBinLhs$22,
              tmpIfTest$46,
              tmpIfTest$47,
              tmpIfTest$48,
            );
            return tmpReturnArg$12;
          };
          if (tmpIfTest$34) {
            const tmpReturnArg$13 = tmpBranchingA$4(
              tmpSwitchValue$13,
              tmpSwitchCaseToStart$13,
              tmpBinLhs$18,
              tmpIfTest$31,
              tmpIfTest$32,
              tmpIfTest$33,
              tmpIfTest$34,
            );
            return tmpReturnArg$13;
          } else {
            const tmpReturnArg$14 = tmpBranchingB$4(
              tmpSwitchValue$13,
              tmpSwitchCaseToStart$13,
              tmpBinLhs$18,
              tmpIfTest$31,
              tmpIfTest$32,
              tmpIfTest$33,
              tmpIfTest$34,
            );
            return tmpReturnArg$14;
          }
        };
        const tmpBranchingC$4 = function (
          tmpSwitchValue$14,
          tmpSwitchCaseToStart$14,
          tmpBinLhs$19,
          tmpIfTest$35,
          tmpIfTest$36,
          tmpIfTest$37,
        ) {
          const tmpReturnArg$15 = tmpBranchingC$3(tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpBinLhs$19, tmpIfTest$35, tmpIfTest$36);
          return tmpReturnArg$15;
        };
        if (tmpIfTest$24) {
          const tmpReturnArg$16 = tmpBranchingA$3(
            tmpSwitchValue$10,
            tmpSwitchCaseToStart$10,
            tmpBinLhs$15,
            tmpIfTest$22,
            tmpIfTest$23,
            tmpIfTest$24,
          );
          return tmpReturnArg$16;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$3(
            tmpSwitchValue$10,
            tmpSwitchCaseToStart$10,
            tmpBinLhs$15,
            tmpIfTest$22,
            tmpIfTest$23,
            tmpIfTest$24,
          );
          return tmpReturnArg$17;
        }
      };
      const tmpBranchingC$3 = function (tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpBinLhs$16, tmpIfTest$26, tmpIfTest$27) {
        const tmpReturnArg$18 = tmpBranchingC$2(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpBinLhs$16, tmpIfTest$26);
        return tmpReturnArg$18;
      };
      if (tmpIfTest$17) {
        const tmpReturnArg$19 = tmpBranchingA$2(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$13, tmpIfTest$16, tmpIfTest$17);
        return tmpReturnArg$19;
      } else {
        const tmpReturnArg$20 = tmpBranchingB$2(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$13, tmpIfTest$16, tmpIfTest$17);
        return tmpReturnArg$20;
      }
    };
    const tmpReturnArg$21 = tmpLabeledBlockFunc(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$5, tmpIfTest$5);
    return tmpReturnArg$21;
  };
  if (tmpIfTest) {
    const tmpReturnArg$22 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$22;
  } else {
    const tmpReturnArg$23 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$23;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpSwitchValue = $(1, 'disc');
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingB = function (tmpSwitchValue$2, tmpSwitchCaseToStart$2) {
    const tmpBinLhs$4 = $(1);
    const tmpIfTest$4 = tmpBinLhs$4 === tmpSwitchValue$2;
    if (tmpIfTest$4) {
      const tmpReturnArg$1 = tmpBranchingC(1);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$5 = tmpBranchingC(tmpSwitchCaseToStart$2);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function (tmpSwitchCaseToStart$3) {
    const tmpIfTest$17 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$2 = function (tmpSwitchCaseToStart$10) {
      const tmpIfTest$24 = tmpSwitchCaseToStart$10 <= 1;
      const tmpBranchingB$3 = function (tmpSwitchCaseToStart$13) {
        const tmpIfTest$34 = tmpSwitchCaseToStart$13 <= 2;
        if (tmpIfTest$34) {
          $('keep, do not eval');
          const tmpReturnArg$10 = $(2, 'ret');
          return tmpReturnArg$10;
        } else {
          $('eliminate after switch');
          return undefined;
        }
      };
      if (tmpIfTest$24) {
        $('keep, eval');
        return undefined;
      } else {
        const tmpReturnArg$17 = tmpBranchingB$3(tmpSwitchCaseToStart$10);
        return tmpReturnArg$17;
      }
    };
    if (tmpIfTest$17) {
      $('keep, do not eval');
      return undefined;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$2(tmpSwitchCaseToStart$3);
      return tmpReturnArg$4;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg = tmpBranchingC(0);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$23 = tmpBranchingB(tmpSwitchValue, 2);
    return tmpReturnArg$23;
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
