# Preval test case

# switch_default2.md

> Normalize > Dce > Throw > Switch default2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      throw 'wrong exit';
    default:
      throw $(2, 'ret');
      $('fail');
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
        throw 'wrong exit';
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, 'ret');
        $('fail');
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
      let tmpIfTest$7 = $$3;
      debugger;
      const tmpIfTest$8 = tmpSwitchCaseToStart$5 <= 0;
      const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$6 = $$0;
        let tmpSwitchCaseToStart$6 = $$1;
        let tmpBinLhs$6 = $$2;
        let tmpIfTest$10 = $$3;
        let tmpIfTest$11 = $$4;
        debugger;
        $('keep, do not eval');
        throw 'wrong exit';
      };
      const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$7 = $$0;
        let tmpSwitchCaseToStart$7 = $$1;
        let tmpBinLhs$7 = $$2;
        let tmpIfTest$12 = $$3;
        let tmpIfTest$13 = $$4;
        debugger;
        const tmpIfTest$14 = tmpSwitchCaseToStart$7 <= 1;
        const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$9 = $$0;
          let tmpSwitchCaseToStart$9 = $$1;
          let tmpBinLhs$9 = $$2;
          let tmpIfTest$17 = $$3;
          let tmpIfTest$18 = $$4;
          let tmpIfTest$19 = $$5;
          debugger;
          const tmpThrowArg$3 = $(2, 'ret');
          throw tmpThrowArg$3;
        };
        const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$10 = $$0;
          let tmpSwitchCaseToStart$10 = $$1;
          let tmpBinLhs$10 = $$2;
          let tmpIfTest$20 = $$3;
          let tmpIfTest$21 = $$4;
          let tmpIfTest$22 = $$5;
          debugger;
          const tmpReturnArg$2 = tmpBranchingC$2(
            tmpSwitchValue$10,
            tmpSwitchCaseToStart$10,
            tmpBinLhs$10,
            tmpIfTest$20,
            tmpIfTest$21,
            tmpIfTest$22,
          );
          return tmpReturnArg$2;
        };
        const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$11 = $$0;
          let tmpSwitchCaseToStart$11 = $$1;
          let tmpBinLhs$11 = $$2;
          let tmpIfTest$23 = $$3;
          let tmpIfTest$24 = $$4;
          let tmpIfTest$25 = $$5;
          debugger;
          const tmpReturnArg$3 = tmpBranchingC$1(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpBinLhs$11, tmpIfTest$23, tmpIfTest$24);
          return tmpReturnArg$3;
        };
        if (tmpIfTest$14) {
          const tmpReturnArg$4 = tmpBranchingA$2(
            tmpSwitchValue$7,
            tmpSwitchCaseToStart$7,
            tmpBinLhs$7,
            tmpIfTest$12,
            tmpIfTest$13,
            tmpIfTest$14,
          );
          return tmpReturnArg$4;
        } else {
          const tmpReturnArg$5 = tmpBranchingB$2(
            tmpSwitchValue$7,
            tmpSwitchCaseToStart$7,
            tmpBinLhs$7,
            tmpIfTest$12,
            tmpIfTest$13,
            tmpIfTest$14,
          );
          return tmpReturnArg$5;
        }
      };
      const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$8 = $$0;
        let tmpSwitchCaseToStart$8 = $$1;
        let tmpBinLhs$8 = $$2;
        let tmpIfTest$15 = $$3;
        let tmpIfTest$16 = $$4;
        debugger;
        const tmpReturnArg$6 = tmpAfterLabel(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$8, tmpIfTest$15);
        return tmpReturnArg$6;
      };
      if (tmpIfTest$8) {
        const tmpReturnArg$7 = tmpBranchingA$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$7, tmpIfTest$8);
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$8 = tmpBranchingB$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$7, tmpIfTest$8);
        return tmpReturnArg$8;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$4 = $$0;
      let tmpSwitchCaseToStart$4 = $$1;
      let tmpBinLhs$4 = $$2;
      let tmpIfTest$6 = $$3;
      debugger;
      $('fail');
    };
    const tmpReturnArg$9 = tmpLabeledBlockFunc(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$11;
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
    const tmpIfTest$8 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$1 = function ($$0) {
      const tmpSwitchCaseToStart$7 = $$0;
      debugger;
      const tmpIfTest$14 = tmpSwitchCaseToStart$7 <= 1;
      if (tmpIfTest$14) {
        const tmpThrowArg$3 = $(2, 'ret');
        throw tmpThrowArg$3;
      } else {
        $('fail');
        return undefined;
      }
    };
    if (tmpIfTest$8) {
      $('keep, do not eval');
      throw 'wrong exit';
    } else {
      const tmpReturnArg$2 = tmpBranchingB$1(tmpSwitchCaseToStart$3);
      return tmpReturnArg$2;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingC(0);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(1);
    return tmpReturnArg$11;
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
