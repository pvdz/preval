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
  debugger;
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
    const tmpIfTest$5 = 1 === tmpSwitchValue;
    const tmpBranchingA$1 = function () {
      debugger;
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpIfTest$9 = 2 === tmpSwitchValue;
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
      if (tmpIfTest$9) {
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
    if (tmpIfTest$5) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$11 = tmpSwitchCaseToStart <= 0;
    const tmpIfTest$13 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$13) {
      return 6;
    } else {
      const tmpIfTest$15 = tmpSwitchCaseToStart <= 2;
      return undefined;
    }
  };
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
  const tmpIfTest$13 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$13) {
    return 6;
  } else {
    tmpSwitchCaseToStart <= 2;
    return undefined;
  }
};
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
