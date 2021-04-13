# Preval test case

# switch_default1.md

> Normalize > Dce > Throw > Switch default1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      throw 'wrong exig';
    default:
      throw $(2, 'ret');
  }
  $('fail');
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
        $('keep, do not eval');
        throw 'wrong exig';
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, 'ret');
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
    const tmpLabeledBlockFunc = function () {
      debugger;
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
      const tmpBranchingA$1 = function () {
        debugger;
        $('keep, do not eval');
        throw 'wrong exig';
      };
      const tmpBranchingB$1 = function () {
        debugger;
        const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
        const tmpBranchingA$3 = function () {
          debugger;
          const tmpThrowArg$5 = $(2, 'ret');
          throw tmpThrowArg$5;
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
        if (tmpIfTest$9) {
          const tmpReturnArg$7 = tmpBranchingA$3();
          return tmpReturnArg$7;
        } else {
          const tmpReturnArg$9 = tmpBranchingB$3();
          return tmpReturnArg$9;
        }
      };
      const tmpBranchingC$1 = function () {
        debugger;
        const tmpReturnArg$11 = tmpAfterLabel();
        return tmpReturnArg$11;
      };
      if (tmpIfTest$5) {
        const tmpReturnArg$13 = tmpBranchingA$1();
        return tmpReturnArg$13;
      } else {
        const tmpReturnArg$15 = tmpBranchingB$1();
        return tmpReturnArg$15;
      }
    };
    const tmpAfterLabel = function () {
      debugger;
      $('fail');
      return undefined;
    };
    const tmpReturnArg$17 = tmpLabeledBlockFunc();
    return tmpReturnArg$17;
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
const f = function () {
  debugger;
  const tmpBranchingB$1 = function () {
    debugger;
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$9) {
      const tmpThrowArg$5 = $(2, 'ret');
      throw tmpThrowArg$5;
    } else {
      $('fail');
      return undefined;
    }
  };
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$5) {
      $('keep, do not eval');
      throw 'wrong exig';
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1();
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$21 = tmpBranchingC();
    return tmpReturnArg$21;
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
