# Preval test case

# early_return3.md

> Normalize > Switch > Early return3
>
> Sorting out the branching stuff

(This is the intermediate step without if-else branch reduction)

#TODO

## Input

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$2 = 2 === tmpSwitchValue;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      }
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    return 6;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$2 = 2 === tmpSwitchValue;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      }
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    return 6;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function (tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$6) {
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$6);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$7) {
    const tmpIfTest$8 = 1 === tmpSwitchValue$2;
    const tmpBranchingA$1 = function (tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$14, tmpIfTest$15) {
      tmpSwitchCaseToStart$4 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$14, tmpIfTest$15);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$16, tmpIfTest$17) {
      const tmpIfTest$18 = 2 === tmpSwitchValue$5;
      const tmpBranchingA$2 = function (tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$21, tmpIfTest$22, tmpIfTest$23) {
        tmpSwitchCaseToStart$7 = 2;
        const tmpReturnArg$2 = tmpBranchingC$2(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$21, tmpIfTest$22, tmpIfTest$23);
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function (tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpIfTest$24, tmpIfTest$25, tmpIfTest$26) {
        const tmpReturnArg$3 = tmpBranchingC$2(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpIfTest$24, tmpIfTest$25, tmpIfTest$26);
        return tmpReturnArg$3;
      };
      const tmpBranchingC$2 = function (tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$27, tmpIfTest$28, tmpIfTest$29) {
        const tmpReturnArg$4 = tmpBranchingC$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$27, tmpIfTest$28);
        return tmpReturnArg$4;
      };
      if (tmpIfTest$18) {
        const tmpReturnArg$5 = tmpBranchingA$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$16, tmpIfTest$17, tmpIfTest$18);
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$6 = tmpBranchingB$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$16, tmpIfTest$17, tmpIfTest$18);
        return tmpReturnArg$6;
      }
    };
    const tmpBranchingC$1 = function (tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpIfTest$19, tmpIfTest$20) {
      const tmpReturnArg$7 = tmpBranchingC(tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpIfTest$19);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$8) {
      const tmpReturnArg$8 = tmpBranchingA$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$7, tmpIfTest$8);
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$7, tmpIfTest$8);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function (tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$10) {
    const tmpIfTest$11 = tmpSwitchCaseToStart$3 <= 0;
    const tmpIfTest$12 = tmpSwitchCaseToStart$3 <= 1;
    if (tmpIfTest$12) {
      return 6;
    } else {
      const tmpIfTest$13 = tmpSwitchCaseToStart$3 <= 2;
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
$(6);
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
