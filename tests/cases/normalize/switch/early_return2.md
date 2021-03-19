# Preval test case

# early_return2.md

> Normalize > Switch > Early return2
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch (1) {
    case 0:
    case 1:
      return 6;
    case 2:
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = 1;
    let tmpSwitchCaseToStart = 3;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
      }
      if (tmpSwitchCaseToStart <= 1) {
        return 6;
      }
      if (tmpSwitchCaseToStart <= 2) {
      }
    }
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function (tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$3) {
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$4) {
    const tmpIfTest$5 = 1 === tmpSwitchValue$2;
    const tmpBranchingA$1 = function (tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$8, tmpIfTest$9) {
      tmpSwitchCaseToStart$4 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$10, tmpIfTest$11) {
      const tmpIfTest$12 = 2 === tmpSwitchValue$5;
      const tmpBranchingA$2 = function (tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$15, tmpIfTest$16, tmpIfTest$17) {
        tmpSwitchCaseToStart$7 = 2;
        const tmpReturnArg$2 = tmpBranchingC$2(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$15, tmpIfTest$16, tmpIfTest$17);
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function (tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpIfTest$18, tmpIfTest$19, tmpIfTest$20) {
        const tmpReturnArg$3 = tmpBranchingC$2(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpIfTest$18, tmpIfTest$19, tmpIfTest$20);
        return tmpReturnArg$3;
      };
      const tmpBranchingC$2 = function (tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$21, tmpIfTest$22, tmpIfTest$23) {
        const tmpReturnArg$4 = tmpBranchingC$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$21, tmpIfTest$22);
        return tmpReturnArg$4;
      };
      if (tmpIfTest$12) {
        const tmpReturnArg$5 = tmpBranchingA$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$10, tmpIfTest$11, tmpIfTest$12);
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$6 = tmpBranchingB$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$10, tmpIfTest$11, tmpIfTest$12);
        return tmpReturnArg$6;
      }
    };
    const tmpBranchingC$1 = function (tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpIfTest$13, tmpIfTest$14) {
      const tmpReturnArg$7 = tmpBranchingC(tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpIfTest$13);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$8 = tmpBranchingA$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$4, tmpIfTest$5);
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$4, tmpIfTest$5);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function (tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$7) {
    const tmpIfTest$24 = tmpSwitchCaseToStart$3 <= 0;
    const tmpIfTest$25 = tmpSwitchCaseToStart$3 <= 1;
    if (tmpIfTest$25) {
      return 6;
    } else {
      const tmpIfTest$26 = tmpSwitchCaseToStart$3 <= 2;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC = function (tmpSwitchCaseToStart$3) {
  tmpSwitchCaseToStart$3 <= 0;
  const tmpIfTest$25 = tmpSwitchCaseToStart$3 <= 1;
  if (tmpIfTest$25) {
    return 6;
  } else {
    tmpSwitchCaseToStart$3 <= 2;
  }
};
const tmpReturnArg = tmpBranchingC(1);
$(tmpReturnArg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
