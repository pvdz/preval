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
  debugger;
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
  debugger;
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
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
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    const tmpBranchingA$1 = function () {
      debugger;
      $('wrong branch');
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpReturnArg$7 = $(2, 'ret');
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$11 = tmpBranchingC$1();
        return tmpReturnArg$11;
      };
      if (tmpIfTest$5) {
        const tmpReturnArg$13 = tmpBranchingA$3();
        return tmpReturnArg$13;
      } else {
        const tmpReturnArg$15 = tmpBranchingB$3();
        return tmpReturnArg$15;
      }
    };
    const tmpBranchingC$1 = function () {
      debugger;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$17 = tmpBranchingA$1();
      return tmpReturnArg$17;
    } else {
      const tmpReturnArg$19 = tmpBranchingB$1();
      return tmpReturnArg$19;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$21 = tmpBranchingA();
    return tmpReturnArg$21;
  } else {
    const tmpReturnArg$23 = tmpBranchingB();
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
  debugger;
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$5) {
        const tmpReturnArg$13 = $(2, 'ret');
        return tmpReturnArg$13;
      } else {
        return undefined;
      }
    };
    if (tmpIfTest$1) {
      $('wrong branch');
      return undefined;
    } else {
      const tmpReturnArg$19 = tmpBranchingB$1();
      return tmpReturnArg$19;
    }
  };
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$23 = tmpBranchingC();
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
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
