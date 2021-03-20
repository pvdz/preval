# Preval test case

# switch_case2.md

> Normalize > Dce > Return > Switch case2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      return $(2, 'ret');
      $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    if ($(1, 'case') === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        return $(2, 'ret');
        $('fail');
      }
    }
  }
  $('keep, do not eval');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(1, 'case');
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
    const tmpBranchingC$1 = function (tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpBinLhs$4, tmpIfTest$5) {
      $('keep, do not eval');
    };
    const tmpLabeledBlockFunc = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$6) {
      const tmpIfTest$7 = tmpSwitchCaseToStart$5 <= 0;
      const tmpBranchingA$1 = function (tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpBinLhs$6, tmpIfTest$8, tmpIfTest$9) {
        const tmpReturnArg$4 = $(2, 'ret');
        return tmpReturnArg$4;
      };
      const tmpBranchingB$1 = function (tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpBinLhs$7, tmpIfTest$10, tmpIfTest$11) {
        const tmpReturnArg$5 = tmpBranchingC$2(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpBinLhs$7, tmpIfTest$10, tmpIfTest$11);
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$8, tmpIfTest$12, tmpIfTest$13) {
        const tmpReturnArg$6 = tmpBranchingC$1(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$8, tmpIfTest$12);
        return tmpReturnArg$6;
      };
      if (tmpIfTest$7) {
        const tmpReturnArg$7 = tmpBranchingA$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$6, tmpIfTest$7);
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$8 = tmpBranchingB$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$6, tmpIfTest$7);
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
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingC = function (tmpSwitchCaseToStart$3) {
    const tmpIfTest$7 = tmpSwitchCaseToStart$3 <= 0;
    if (tmpIfTest$7) {
      const tmpReturnArg$2 = $(2, 'ret');
      return tmpReturnArg$2;
    } else {
      $('keep, do not eval');
      return undefined;
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
 - 2: 1, 'case'
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
