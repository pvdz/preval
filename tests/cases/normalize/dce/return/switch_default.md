# Preval test case

# switch_default.md

> Normalize > Dce > Return > Switch default
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('wrong branch');
      return;
    default:
      return $(2, 'ret');
      $('fail');
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $('wrong branch');
        return;
      }
      if (tmpSwitchCaseToStart <= 1) {
        return $(2, 'ret');
        $('fail');
      }
    }
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingA = function (tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpBinLhs$1, tmpIfTest$1) {
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpBinLhs$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3) {
    const tmpIfTest$4 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingA$1 = function (tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpBinLhs$4, tmpIfTest$6, tmpIfTest$7) {
      $('wrong branch');
    };
    const tmpBranchingB$1 = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$8, tmpIfTest$9) {
      const tmpIfTest$10 = tmpSwitchCaseToStart$5 <= 1;
      const tmpBranchingA$2 = function (tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpBinLhs$7, tmpIfTest$13, tmpIfTest$14, tmpIfTest$15) {
        const tmpReturnArg$4 = $(2, 'ret');
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$8, tmpIfTest$16, tmpIfTest$17, tmpIfTest$18) {
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpSwitchValue$8,
          tmpSwitchCaseToStart$8,
          tmpBinLhs$8,
          tmpIfTest$16,
          tmpIfTest$17,
          tmpIfTest$18,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$19, tmpIfTest$20, tmpIfTest$21) {
        const tmpReturnArg$6 = tmpBranchingC$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$19, tmpIfTest$20);
        return tmpReturnArg$6;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$7 = tmpBranchingA$2(
          tmpSwitchValue$5,
          tmpSwitchCaseToStart$5,
          tmpBinLhs$5,
          tmpIfTest$8,
          tmpIfTest$9,
          tmpIfTest$10,
        );
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$8 = tmpBranchingB$2(
          tmpSwitchValue$5,
          tmpSwitchCaseToStart$5,
          tmpBinLhs$5,
          tmpIfTest$8,
          tmpIfTest$9,
          tmpIfTest$10,
        );
        return tmpReturnArg$8;
      }
    };
    const tmpBranchingC$1 = function (tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpBinLhs$6, tmpIfTest$11, tmpIfTest$12) {};
    if (tmpIfTest$4) {
      const tmpReturnArg$9 = tmpBranchingA$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$10 = tmpBranchingB$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$10;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$12 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$12;
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
  const tmpBranchingC = function (tmpSwitchCaseToStart$3) {
    const tmpIfTest$4 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$1 = function (tmpSwitchCaseToStart$5) {
      const tmpIfTest$10 = tmpSwitchCaseToStart$5 <= 1;
      if (tmpIfTest$10) {
        const tmpReturnArg$7 = $(2, 'ret');
        return tmpReturnArg$7;
      } else {
        return undefined;
      }
    };
    if (tmpIfTest$4) {
      $('wrong branch');
      return undefined;
    } else {
      const tmpReturnArg$10 = tmpBranchingB$1(tmpSwitchCaseToStart$3);
      return tmpReturnArg$10;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg = tmpBranchingC(0);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$12 = tmpBranchingC(1);
    return tmpReturnArg$12;
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
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
