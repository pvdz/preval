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
  const tmpBranchingA = function () {
    debugger;
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
    const tmpBranchingA$1 = function () {
      debugger;
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpLabeledBlockFunc = function () {
      debugger;
      const tmpIfTest$11 = tmpSwitchCaseToStart <= 0;
      const tmpBranchingA$3 = function () {
        debugger;
        $('keep, do not eval');
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpIfTest$17 = tmpSwitchCaseToStart <= 1;
        const tmpBranchingA$5 = function () {
          debugger;
          $('keep, eval');
        };
        const tmpBranchingB$5 = function () {
          debugger;
          const tmpIfTest$21 = tmpSwitchCaseToStart <= 2;
          const tmpBranchingA$7 = function () {
            debugger;
            $('keep, do not eval');
            const tmpReturnArg$19 = $(2, 'ret');
            return tmpReturnArg$19;
          };
          const tmpBranchingB$7 = function () {
            debugger;
            const tmpReturnArg$21 = tmpBranchingC$7();
            return tmpReturnArg$21;
          };
          const tmpBranchingC$7 = function () {
            debugger;
            const tmpReturnArg$23 = tmpBranchingC$5();
            return tmpReturnArg$23;
          };
          if (tmpIfTest$21) {
            const tmpReturnArg$25 = tmpBranchingA$7();
            return tmpReturnArg$25;
          } else {
            const tmpReturnArg$27 = tmpBranchingB$7();
            return tmpReturnArg$27;
          }
        };
        const tmpBranchingC$5 = function () {
          debugger;
          const tmpReturnArg$29 = tmpBranchingC$3();
          return tmpReturnArg$29;
        };
        if (tmpIfTest$17) {
          const tmpReturnArg$31 = tmpBranchingA$5();
          return tmpReturnArg$31;
        } else {
          const tmpReturnArg$33 = tmpBranchingB$5();
          return tmpReturnArg$33;
        }
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$35 = tmpAfterLabel();
        return tmpReturnArg$35;
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$37 = tmpBranchingA$3();
        return tmpReturnArg$37;
      } else {
        const tmpReturnArg$39 = tmpBranchingB$3();
        return tmpReturnArg$39;
      }
    };
    const tmpAfterLabel = function () {
      debugger;
      $('eliminate after switch');
    };
    const tmpReturnArg$41 = tmpLabeledBlockFunc();
    return tmpReturnArg$41;
  };
  if (tmpIfTest) {
    const tmpReturnArg$43 = tmpBranchingA();
    return tmpReturnArg$43;
  } else {
    const tmpReturnArg$45 = tmpBranchingB();
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
  const tmpBranchingB$5 = function () {
    debugger;
    const tmpIfTest$21 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$21) {
      $('keep, do not eval');
      const tmpReturnArg$19 = $(2, 'ret');
      return tmpReturnArg$19;
    } else {
      $('eliminate after switch');
      return undefined;
    }
  };
  const tmpBranchingB$3 = function () {
    debugger;
    const tmpIfTest$17 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$17) {
      $('keep, eval');
      return undefined;
    } else {
      const tmpReturnArg$33 = tmpBranchingB$5();
      return tmpReturnArg$33;
    }
  };
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 2;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingB = function () {
    debugger;
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$9 = tmpBranchingC();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$11 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$11) {
      $('keep, do not eval');
      return undefined;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$3();
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$45 = tmpBranchingB();
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
