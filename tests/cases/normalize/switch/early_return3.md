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
  debugger;
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
  debugger;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function () {
    debugger;
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$6 = 1 === tmpSwitchValue;
    const tmpBranchingA$1 = function () {
      debugger;
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpIfTest$12 = 2 === tmpSwitchValue;
      const tmpBranchingA$3 = function () {
        debugger;
        tmpSwitchCaseToStart = 2;
        const tmpReturnArg$3 = tmpBranchingC$3();
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$3();
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$1();
        return tmpReturnArg$7;
      };
      if (tmpIfTest$12) {
        const tmpReturnArg$9 = tmpBranchingA$3();
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3();
        return tmpReturnArg$11;
      }
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$13 = tmpBranchingC();
      return tmpReturnArg$13;
    };
    if (tmpIfTest$6) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
    tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$4) {
      return 6;
    } else {
      const tmpIfTest$10 = tmpSwitchCaseToStart <= 2;
      return undefined;
    }
  };
  let tmpIfTest$3 = undefined;
  let tmpIfTest$4 = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 3;
const tmpBranchingB = function () {
  debugger;
  tmpSwitchCaseToStart = 1;
  tmpSwitchCaseToStart <= 0;
  tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    return 6;
  } else {
    tmpSwitchCaseToStart <= 2;
    return undefined;
  }
};
let tmpIfTest$4 = undefined;
const tmpReturnArg$21 = tmpBranchingB();
$(tmpReturnArg$21);
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
