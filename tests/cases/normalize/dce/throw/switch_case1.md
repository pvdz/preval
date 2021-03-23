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
    let tmpSwitchValue$2 = $$0;
    let tmpSwitchCaseToStart$2 = $$1;
    let tmpBinLhs$2 = $$2;
    let tmpIfTest$2 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpLabeledBlockFunc = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$5 = $$0;
      let tmpSwitchCaseToStart$5 = $$1;
      let tmpBinLhs$5 = $$2;
      let tmpIfTest$6 = $$3;
      debugger;
      const tmpIfTest$7 = tmpSwitchCaseToStart$5 <= 0;
      const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$6 = $$0;
        let tmpSwitchCaseToStart$6 = $$1;
        let tmpBinLhs$6 = $$2;
        let tmpIfTest$8 = $$3;
        let tmpIfTest$9 = $$4;
        debugger;
        const tmpThrowArg$2 = $(2, 'ret');
        throw tmpThrowArg$2;
      };
      const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$7 = $$0;
        let tmpSwitchCaseToStart$7 = $$1;
        let tmpBinLhs$7 = $$2;
        let tmpIfTest$10 = $$3;
        let tmpIfTest$11 = $$4;
        debugger;
        const tmpReturnArg$2 = tmpBranchingC$1(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpBinLhs$7, tmpIfTest$10, tmpIfTest$11);
        return tmpReturnArg$2;
      };
      const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$8 = $$0;
        let tmpSwitchCaseToStart$8 = $$1;
        let tmpBinLhs$8 = $$2;
        let tmpIfTest$12 = $$3;
        let tmpIfTest$13 = $$4;
        debugger;
        const tmpReturnArg$3 = tmpAfterLabel(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$8, tmpIfTest$12);
        return tmpReturnArg$3;
      };
      if (tmpIfTest$7) {
        const tmpReturnArg$4 = tmpBranchingA$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$6, tmpIfTest$7);
        return tmpReturnArg$4;
      } else {
        const tmpReturnArg$5 = tmpBranchingB$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$6, tmpIfTest$7);
        return tmpReturnArg$5;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$4 = $$0;
      let tmpSwitchCaseToStart$4 = $$1;
      let tmpBinLhs$4 = $$2;
      let tmpIfTest$5 = $$3;
      debugger;
      $('keep, do not eval');
    };
    const tmpReturnArg$6 = tmpLabeledBlockFunc(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3);
    return tmpReturnArg$6;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$8;
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
  const tmpBranchingC = function ($$0) {
    const tmpSwitchCaseToStart$3 = $$0;
    debugger;
    const tmpIfTest$7 = tmpSwitchCaseToStart$3 <= 0;
    if (tmpIfTest$7) {
      const tmpThrowArg$1 = $(2, 'ret');
      throw tmpThrowArg$1;
    } else {
      $('keep, do not eval');
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingC(0);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingC(1);
    return tmpReturnArg$8;
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
