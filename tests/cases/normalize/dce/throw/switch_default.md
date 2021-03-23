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
    const tmpIfTest$4 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$4 = $$0;
      let tmpSwitchCaseToStart$4 = $$1;
      let tmpBinLhs$4 = $$2;
      let tmpIfTest$6 = $$3;
      let tmpIfTest$7 = $$4;
      debugger;
      $('wrong branch');
      throw 'wrong exit';
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$5 = $$0;
      let tmpSwitchCaseToStart$5 = $$1;
      let tmpBinLhs$5 = $$2;
      let tmpIfTest$8 = $$3;
      let tmpIfTest$9 = $$4;
      debugger;
      const tmpIfTest$10 = tmpSwitchCaseToStart$5 <= 1;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpSwitchValue$7 = $$0;
        let tmpSwitchCaseToStart$7 = $$1;
        let tmpBinLhs$7 = $$2;
        let tmpIfTest$13 = $$3;
        let tmpIfTest$14 = $$4;
        let tmpIfTest$15 = $$5;
        debugger;
        const tmpThrowArg$2 = $(2, 'throw');
        throw tmpThrowArg$2;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpSwitchValue$8 = $$0;
        let tmpSwitchCaseToStart$8 = $$1;
        let tmpBinLhs$8 = $$2;
        let tmpIfTest$16 = $$3;
        let tmpIfTest$17 = $$4;
        let tmpIfTest$18 = $$5;
        debugger;
        const tmpReturnArg$2 = tmpBranchingC$2(
          tmpSwitchValue$8,
          tmpSwitchCaseToStart$8,
          tmpBinLhs$8,
          tmpIfTest$16,
          tmpIfTest$17,
          tmpIfTest$18,
        );
        return tmpReturnArg$2;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpSwitchValue$9 = $$0;
        let tmpSwitchCaseToStart$9 = $$1;
        let tmpBinLhs$9 = $$2;
        let tmpIfTest$19 = $$3;
        let tmpIfTest$20 = $$4;
        let tmpIfTest$21 = $$5;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$19, tmpIfTest$20);
        return tmpReturnArg$3;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$4 = tmpBranchingA$2(
          tmpSwitchValue$5,
          tmpSwitchCaseToStart$5,
          tmpBinLhs$5,
          tmpIfTest$8,
          tmpIfTest$9,
          tmpIfTest$10,
        );
        return tmpReturnArg$4;
      } else {
        const tmpReturnArg$5 = tmpBranchingB$2(
          tmpSwitchValue$5,
          tmpSwitchCaseToStart$5,
          tmpBinLhs$5,
          tmpIfTest$8,
          tmpIfTest$9,
          tmpIfTest$10,
        );
        return tmpReturnArg$5;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$6 = $$0;
      let tmpSwitchCaseToStart$6 = $$1;
      let tmpBinLhs$6 = $$2;
      let tmpIfTest$11 = $$3;
      let tmpIfTest$12 = $$4;
      debugger;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$6 = tmpBranchingA$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$6;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$7;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$9;
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
    const tmpSwitchCaseToStart$3 = $$0;
    debugger;
    const tmpIfTest$4 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$1 = function ($$0) {
      const tmpSwitchCaseToStart$5 = $$0;
      debugger;
      const tmpIfTest$10 = tmpSwitchCaseToStart$5 <= 1;
      if (tmpIfTest$10) {
        const tmpThrowArg$2 = $(2, 'throw');
        throw tmpThrowArg$2;
      } else {
        return undefined;
      }
    };
    if (tmpIfTest$4) {
      $('wrong branch');
      throw 'wrong exit';
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpSwitchCaseToStart$3);
      return tmpReturnArg$7;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingC(0);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingC(1);
    return tmpReturnArg$9;
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
