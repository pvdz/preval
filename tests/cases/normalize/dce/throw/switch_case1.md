# Preval test case

# switch_case1.md

> Normalize > Dce > Throw > Switch case1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      throw $(2, 'ret');
  }
  $('keep, do not eval');
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
    if ($(1, 'case') === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        throw $(2, 'ret');
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
  debugger;
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(1, 'case');
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
      const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
      const tmpBranchingA$1 = function () {
        debugger;
        const tmpThrowArg$3 = $(2, 'ret');
        throw tmpThrowArg$3;
      };
      const tmpBranchingB$1 = function () {
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1();
        return tmpReturnArg$3;
      };
      const tmpBranchingC$1 = function () {
        debugger;
        const tmpReturnArg$5 = tmpAfterLabel();
        return tmpReturnArg$5;
      };
      if (tmpIfTest$3) {
        const tmpReturnArg$7 = tmpBranchingA$1();
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$9 = tmpBranchingB$1();
        return tmpReturnArg$9;
      }
    };
    const tmpAfterLabel = function () {
      debugger;
      $('keep, do not eval');
    };
    const tmpReturnArg$11 = tmpLabeledBlockFunc();
    return tmpReturnArg$11;
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
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
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$3) {
      const tmpThrowArg$1 = $(2, 'ret');
      throw tmpThrowArg$1;
    } else {
      $('keep, do not eval');
      return undefined;
    }
  };
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingC();
    return tmpReturnArg$15;
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
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
