# Preval test case

# switch_default.md

> Normalize > Dce > Throw > Switch default
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('wrong branch');
      throw 'wrong exit';
    default:
      throw $(2, 'throw');
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
        throw 'wrong exit';
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, 'throw');
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
      throw 'wrong exit';
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpThrowArg$3 = $(2, 'throw');
        throw tmpThrowArg$3;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$3();
        return tmpReturnArg$3;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$1();
        return tmpReturnArg$5;
      };
      if (tmpIfTest$5) {
        const tmpReturnArg$7 = tmpBranchingA$3();
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$9 = tmpBranchingB$3();
        return tmpReturnArg$9;
      }
    };
    const tmpBranchingC$1 = function () {
      debugger;
      return undefined;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$11 = tmpBranchingA$1();
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1();
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA();
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB();
    return tmpReturnArg$17;
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
  const tmpBranchingB$1 = function () {
    debugger;
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      const tmpThrowArg$3 = $(2, 'throw');
      throw tmpThrowArg$3;
    } else {
      return undefined;
    }
  };
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      $('wrong branch');
      throw 'wrong exit';
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1();
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$17 = tmpBranchingC();
    return tmpReturnArg$17;
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
 - 3: 2, 'throw'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
