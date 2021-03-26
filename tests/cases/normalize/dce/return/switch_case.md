# Preval test case

# switch_case.md

> Normalize > Dce > Return > Switch case
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
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpBinLhs$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpBinLhs$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$5 = $$0;
    let tmpSwitchCaseToStart$5 = $$1;
    let tmpBinLhs$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpIfTest$7 = tmpSwitchCaseToStart$5 <= 0;
    if (tmpIfTest$7) {
      const tmpReturnArg$3 = $(2, 'ret');
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$7;
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
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    const tmpReturnArg$5 = $(2, 'ret');
    return tmpReturnArg$5;
  } else {
    return undefined;
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
