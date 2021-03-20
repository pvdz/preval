# Preval test case

# switch_default2.md

> Normalize > Dce > Throw > Switch default2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      throw 'wrong exit';
    default:
      throw $(2, 'ret');
      $('fail');
  }
  $('fail');
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
        $('keep, do not eval');
        throw 'wrong exit';
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, 'ret');
        $('fail');
      }
    }
  }
  $('fail');
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
    const tmpBranchingC$1 = function (tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpBinLhs$4, tmpIfTest$6) {
      $('fail');
    };
    const tmpLabeledBlockFunc = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$7) {
      const tmpIfTest$8 = tmpSwitchCaseToStart$5 <= 0;
      const tmpBranchingA$1 = function (tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpBinLhs$6, tmpIfTest$10, tmpIfTest$11) {
        $('keep, do not eval');
        throw 'wrong exit';
      };
      const tmpBranchingB$1 = function (tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpBinLhs$7, tmpIfTest$12, tmpIfTest$13) {
        const tmpIfTest$14 = tmpSwitchCaseToStart$7 <= 1;
        const tmpBranchingA$2 = function (tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$17, tmpIfTest$18, tmpIfTest$19) {
          const tmpThrowArg$3 = $(2, 'ret');
          throw tmpThrowArg$3;
        };
        const tmpBranchingB$2 = function (
          tmpSwitchValue$10,
          tmpSwitchCaseToStart$10,
          tmpBinLhs$10,
          tmpIfTest$20,
          tmpIfTest$21,
          tmpIfTest$22,
        ) {
          const tmpReturnArg$2 = tmpBranchingC$3(
            tmpSwitchValue$10,
            tmpSwitchCaseToStart$10,
            tmpBinLhs$10,
            tmpIfTest$20,
            tmpIfTest$21,
            tmpIfTest$22,
          );
          return tmpReturnArg$2;
        };
        const tmpBranchingC$3 = function (
          tmpSwitchValue$11,
          tmpSwitchCaseToStart$11,
          tmpBinLhs$11,
          tmpIfTest$23,
          tmpIfTest$24,
          tmpIfTest$25,
        ) {
          const tmpReturnArg$3 = tmpBranchingC$2(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpBinLhs$11, tmpIfTest$23, tmpIfTest$24);
          return tmpReturnArg$3;
        };
        if (tmpIfTest$14) {
          const tmpReturnArg$4 = tmpBranchingA$2(
            tmpSwitchValue$7,
            tmpSwitchCaseToStart$7,
            tmpBinLhs$7,
            tmpIfTest$12,
            tmpIfTest$13,
            tmpIfTest$14,
          );
          return tmpReturnArg$4;
        } else {
          const tmpReturnArg$5 = tmpBranchingB$2(
            tmpSwitchValue$7,
            tmpSwitchCaseToStart$7,
            tmpBinLhs$7,
            tmpIfTest$12,
            tmpIfTest$13,
            tmpIfTest$14,
          );
          return tmpReturnArg$5;
        }
      };
      const tmpBranchingC$2 = function (tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$8, tmpIfTest$15, tmpIfTest$16) {
        const tmpReturnArg$6 = tmpBranchingC$1(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$8, tmpIfTest$15);
        return tmpReturnArg$6;
      };
      if (tmpIfTest$8) {
        const tmpReturnArg$7 = tmpBranchingA$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$7, tmpIfTest$8);
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$8 = tmpBranchingB$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$7, tmpIfTest$8);
        return tmpReturnArg$8;
      }
    };
    const tmpReturnArg$9 = tmpLabeledBlockFunc(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$11;
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
    const tmpIfTest$8 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$1 = function (tmpSwitchCaseToStart$7) {
      const tmpIfTest$14 = tmpSwitchCaseToStart$7 <= 1;
      if (tmpIfTest$14) {
        const tmpThrowArg$3 = $(2, 'ret');
        throw tmpThrowArg$3;
      } else {
        $('fail');
        return undefined;
      }
    };
    if (tmpIfTest$8) {
      $('keep, do not eval');
      throw 'wrong exit';
    } else {
      const tmpReturnArg$3 = tmpBranchingB$1(tmpSwitchCaseToStart$3);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg = tmpBranchingC(0);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(1);
    return tmpReturnArg$11;
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
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
