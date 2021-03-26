# Preval test case

# switch_case2.md

> Normalize > Dce > Throw > Switch case2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      throw $(2, 'ret');
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
        throw $(2, 'ret');
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
    const tmpLabeledBlockFunc = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$9 = $$0;
      let tmpSwitchCaseToStart$9 = $$1;
      let tmpBinLhs$9 = $$2;
      let tmpIfTest$11 = $$3;
      debugger;
      const tmpIfTest$13 = tmpSwitchCaseToStart$9 <= 0;
      const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$11 = $$0;
        let tmpSwitchCaseToStart$11 = $$1;
        let tmpBinLhs$11 = $$2;
        let tmpIfTest$15 = $$3;
        let tmpIfTest$17 = $$4;
        debugger;
        const tmpThrowArg$3 = $(2, 'ret');
        throw tmpThrowArg$3;
      };
      const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$13 = $$0;
        let tmpSwitchCaseToStart$13 = $$1;
        let tmpBinLhs$13 = $$2;
        let tmpIfTest$19 = $$3;
        let tmpIfTest$21 = $$4;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1(tmpSwitchValue$13, tmpSwitchCaseToStart$13, tmpBinLhs$13, tmpIfTest$19, tmpIfTest$21);
        return tmpReturnArg$3;
      };
      const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpBinLhs$15 = $$2;
        let tmpIfTest$23 = $$3;
        let tmpIfTest$25 = $$4;
        debugger;
        const tmpReturnArg$5 = tmpAfterLabel(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpBinLhs$15, tmpIfTest$23);
        return tmpReturnArg$5;
      };
      if (tmpIfTest$13) {
        const tmpReturnArg$7 = tmpBranchingA$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$11, tmpIfTest$13);
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$9 = tmpBranchingB$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$11, tmpIfTest$13);
        return tmpReturnArg$9;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpBinLhs$7 = $$2;
      let tmpIfTest$9 = $$3;
      debugger;
      $('keep, do not eval');
    };
    const tmpReturnArg$11 = tmpLabeledBlockFunc(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$5);
    return tmpReturnArg$11;
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
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
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    const tmpThrowArg$5 = $(2, 'ret');
    throw tmpThrowArg$5;
  } else {
    $('keep, do not eval');
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
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
