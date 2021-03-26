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
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpBinLhs$7 = $$2;
      let tmpIfTest$11 = $$3;
      let tmpIfTest$13 = $$4;
      debugger;
      $('wrong branch');
      throw 'wrong exit';
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$9 = $$0;
      let tmpSwitchCaseToStart$9 = $$1;
      let tmpBinLhs$9 = $$2;
      let tmpIfTest$15 = $$3;
      let tmpIfTest$17 = $$4;
      debugger;
      const tmpIfTest$19 = tmpSwitchCaseToStart$9 <= 1;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpSwitchValue$13 = $$0;
        let tmpSwitchCaseToStart$13 = $$1;
        let tmpBinLhs$13 = $$2;
        let tmpIfTest$25 = $$3;
        let tmpIfTest$27 = $$4;
        let tmpIfTest$29 = $$5;
        debugger;
        const tmpThrowArg$3 = $(2, 'throw');
        throw tmpThrowArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpBinLhs$15 = $$2;
        let tmpIfTest$31 = $$3;
        let tmpIfTest$33 = $$4;
        let tmpIfTest$35 = $$5;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$3(
          tmpSwitchValue$15,
          tmpSwitchCaseToStart$15,
          tmpBinLhs$15,
          tmpIfTest$31,
          tmpIfTest$33,
          tmpIfTest$35,
        );
        return tmpReturnArg$3;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpSwitchValue$17 = $$0;
        let tmpSwitchCaseToStart$17 = $$1;
        let tmpBinLhs$17 = $$2;
        let tmpIfTest$37 = $$3;
        let tmpIfTest$39 = $$4;
        let tmpIfTest$41 = $$5;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$1(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpBinLhs$17, tmpIfTest$37, tmpIfTest$39);
        return tmpReturnArg$5;
      };
      if (tmpIfTest$19) {
        const tmpReturnArg$7 = tmpBranchingA$3(
          tmpSwitchValue$9,
          tmpSwitchCaseToStart$9,
          tmpBinLhs$9,
          tmpIfTest$15,
          tmpIfTest$17,
          tmpIfTest$19,
        );
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$9 = tmpBranchingB$3(
          tmpSwitchValue$9,
          tmpSwitchCaseToStart$9,
          tmpBinLhs$9,
          tmpIfTest$15,
          tmpIfTest$17,
          tmpIfTest$19,
        );
        return tmpReturnArg$9;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$11 = $$0;
      let tmpSwitchCaseToStart$11 = $$1;
      let tmpBinLhs$11 = $$2;
      let tmpIfTest$21 = $$3;
      let tmpIfTest$23 = $$4;
      debugger;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$11 = tmpBranchingA$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
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
  const tmpSwitchValue = $(1, 'disc');
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingC = function ($$0) {
    const tmpSwitchCaseToStart$5 = $$0;
    debugger;
    const tmpIfTest$7 = tmpSwitchCaseToStart$5 <= 0;
    const tmpBranchingB$1 = function ($$0) {
      const tmpSwitchCaseToStart$9 = $$0;
      debugger;
      const tmpIfTest$19 = tmpSwitchCaseToStart$9 <= 1;
      if (tmpIfTest$19) {
        const tmpThrowArg$3 = $(2, 'throw');
        throw tmpThrowArg$3;
      } else {
        return undefined;
      }
    };
    if (tmpIfTest$7) {
      $('wrong branch');
      throw 'wrong exit';
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(tmpSwitchCaseToStart$5);
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingC(0);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingC(1);
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
