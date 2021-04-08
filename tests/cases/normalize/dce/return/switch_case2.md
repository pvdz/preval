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
  debugger;
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
        const tmpReturnArg$7 = $(2, 'ret');
        return tmpReturnArg$7;
      };
      const tmpBranchingB$1 = function () {
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$1();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$1 = function () {
        debugger;
        const tmpReturnArg$11 = tmpAfterLabel();
        return tmpReturnArg$11;
      };
      if (tmpIfTest$3) {
        const tmpReturnArg$13 = tmpBranchingA$1();
        return tmpReturnArg$13;
      } else {
        const tmpReturnArg$15 = tmpBranchingB$1();
        return tmpReturnArg$15;
      }
    };
    const tmpAfterLabel = function () {
      debugger;
      $('keep, do not eval');
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
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = $(2, 'ret');
      return tmpReturnArg$3;
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
 - 2: 1, 'case'
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
