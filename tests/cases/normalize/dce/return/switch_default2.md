# Preval test case

# switch_default2.md

> Normalize > Dce > Return > Switch default2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
    default:
      return $(2, 'ret');
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
        return;
      }
      if (tmpSwitchCaseToStart <= 1) {
        return $(2, 'ret');
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
      let tmpIfTest$13 = $$3;
      debugger;
      const tmpIfTest$15 = tmpSwitchCaseToStart$9 <= 0;
      const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$11 = $$0;
        let tmpSwitchCaseToStart$11 = $$1;
        let tmpBinLhs$11 = $$2;
        let tmpIfTest$19 = $$3;
        let tmpIfTest$21 = $$4;
        debugger;
        $('keep, do not eval');
      };
      const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$13 = $$0;
        let tmpSwitchCaseToStart$13 = $$1;
        let tmpBinLhs$13 = $$2;
        let tmpIfTest$23 = $$3;
        let tmpIfTest$25 = $$4;
        debugger;
        const tmpIfTest$27 = tmpSwitchCaseToStart$13 <= 1;
        const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$17 = $$0;
          let tmpSwitchCaseToStart$17 = $$1;
          let tmpBinLhs$17 = $$2;
          let tmpIfTest$33 = $$3;
          let tmpIfTest$35 = $$4;
          let tmpIfTest$37 = $$5;
          debugger;
          const tmpReturnArg$9 = $(2, 'ret');
          return tmpReturnArg$9;
        };
        const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$19 = $$0;
          let tmpSwitchCaseToStart$19 = $$1;
          let tmpBinLhs$19 = $$2;
          let tmpIfTest$39 = $$3;
          let tmpIfTest$41 = $$4;
          let tmpIfTest$43 = $$5;
          debugger;
          const tmpReturnArg$11 = tmpBranchingC$3(
            tmpSwitchValue$19,
            tmpSwitchCaseToStart$19,
            tmpBinLhs$19,
            tmpIfTest$39,
            tmpIfTest$41,
            tmpIfTest$43,
          );
          return tmpReturnArg$11;
        };
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$21 = $$0;
          let tmpSwitchCaseToStart$21 = $$1;
          let tmpBinLhs$21 = $$2;
          let tmpIfTest$45 = $$3;
          let tmpIfTest$47 = $$4;
          let tmpIfTest$49 = $$5;
          debugger;
          const tmpReturnArg$13 = tmpBranchingC$1(tmpSwitchValue$21, tmpSwitchCaseToStart$21, tmpBinLhs$21, tmpIfTest$45, tmpIfTest$47);
          return tmpReturnArg$13;
        };
        if (tmpIfTest$27) {
          const tmpReturnArg$15 = tmpBranchingA$3(
            tmpSwitchValue$13,
            tmpSwitchCaseToStart$13,
            tmpBinLhs$13,
            tmpIfTest$23,
            tmpIfTest$25,
            tmpIfTest$27,
          );
          return tmpReturnArg$15;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$3(
            tmpSwitchValue$13,
            tmpSwitchCaseToStart$13,
            tmpBinLhs$13,
            tmpIfTest$23,
            tmpIfTest$25,
            tmpIfTest$27,
          );
          return tmpReturnArg$17;
        }
      };
      const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpBinLhs$15 = $$2;
        let tmpIfTest$29 = $$3;
        let tmpIfTest$31 = $$4;
        debugger;
        const tmpReturnArg$19 = tmpAfterLabel(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpBinLhs$15, tmpIfTest$29);
        return tmpReturnArg$19;
      };
      if (tmpIfTest$15) {
        const tmpReturnArg$21 = tmpBranchingA$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$13, tmpIfTest$15);
        return tmpReturnArg$21;
      } else {
        const tmpReturnArg$23 = tmpBranchingB$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpBinLhs$9, tmpIfTest$13, tmpIfTest$15);
        return tmpReturnArg$23;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpBinLhs$7 = $$2;
      let tmpIfTest$11 = $$3;
      debugger;
      $('fail');
    };
    const tmpReturnArg$25 = tmpLabeledBlockFunc(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$5, tmpIfTest$5);
    return tmpReturnArg$25;
  };
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$29;
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
    const tmpIfTest$15 = tmpSwitchCaseToStart$5 <= 0;
    const tmpBranchingB$1 = function ($$0) {
      const tmpSwitchCaseToStart$13 = $$0;
      debugger;
      const tmpIfTest$27 = tmpSwitchCaseToStart$13 <= 1;
      if (tmpIfTest$27) {
        const tmpReturnArg$15 = $(2, 'ret');
        return tmpReturnArg$15;
      } else {
        $('fail');
        return undefined;
      }
    };
    if (tmpIfTest$15) {
      $('keep, do not eval');
      return undefined;
    } else {
      const tmpReturnArg$3 = tmpBranchingB$1(tmpSwitchCaseToStart$5);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingC(0);
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingC(1);
    return tmpReturnArg$29;
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
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
