# Preval test case

# switch_all.md

> Normalize > Dce > Return > Switch all
>
> Any statements that follow a return in the same parent should be eliminated.

If all switch cases return, including a default, then the code after a switch is dead code.

Simple case to check whether the switch transform doesn't prevent this.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
      $('eliminate');
    case $(1):
      $('keep, eval');
      return;
      $('eliminate');
    default:
      $('keep, do not eval');
      return $(2, 'ret');
      $('eliminate');
  }
  $('eliminate after switch');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 2;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $('keep, do not eval');
        return;
        $('eliminate');
      }
      if (tmpSwitchCaseToStart <= 1) {
        $('keep, eval');
        return;
        $('eliminate');
      }
      if (tmpSwitchCaseToStart <= 2) {
        $('keep, do not eval');
        return $(2, 'ret');
        $('eliminate');
      }
    }
  }
  $('eliminate after switch');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 2;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpBinLhs$2 = $$2;
    let tmpIfTest$2 = $$3;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpBinLhs$2, tmpIfTest$2);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$2 = $$0;
    let tmpSwitchCaseToStart$2 = $$1;
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpBinLhs$4 = $(1);
    const tmpIfTest$4 = tmpBinLhs$4 === tmpSwitchValue$2;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpSwitchValue$4 = $$0;
      let tmpSwitchCaseToStart$4 = $$1;
      let tmpBinLhs$6 = $$2;
      let tmpIfTest$6 = $$3;
      let tmpBinLhs$7 = $$4;
      let tmpIfTest$7 = $$5;
      debugger;
      tmpSwitchCaseToStart$4 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpBinLhs$6, tmpIfTest$6, tmpBinLhs$7, tmpIfTest$7);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpSwitchValue$5 = $$0;
      let tmpSwitchCaseToStart$5 = $$1;
      let tmpBinLhs$8 = $$2;
      let tmpIfTest$8 = $$3;
      let tmpBinLhs$9 = $$4;
      let tmpIfTest$9 = $$5;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC$1(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpBinLhs$8, tmpIfTest$8, tmpBinLhs$9, tmpIfTest$9);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpSwitchValue$6 = $$0;
      let tmpSwitchCaseToStart$6 = $$1;
      let tmpBinLhs$10 = $$2;
      let tmpIfTest$10 = $$3;
      let tmpBinLhs$11 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpBinLhs$10, tmpIfTest$10);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$3, tmpIfTest$3, tmpBinLhs$4, tmpIfTest$4);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpBinLhs$3, tmpIfTest$3, tmpBinLhs$4, tmpIfTest$4);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpBinLhs$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpLabeledBlockFunc = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$8 = $$0;
      let tmpSwitchCaseToStart$8 = $$1;
      let tmpBinLhs$13 = $$2;
      let tmpIfTest$16 = $$3;
      debugger;
      const tmpIfTest$17 = tmpSwitchCaseToStart$8 <= 0;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$9 = $$0;
        let tmpSwitchCaseToStart$9 = $$1;
        let tmpBinLhs$14 = $$2;
        let tmpIfTest$20 = $$3;
        let tmpIfTest$21 = $$4;
        debugger;
        $('keep, do not eval');
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$10 = $$0;
        let tmpSwitchCaseToStart$10 = $$1;
        let tmpBinLhs$15 = $$2;
        let tmpIfTest$22 = $$3;
        let tmpIfTest$23 = $$4;
        debugger;
        const tmpIfTest$24 = tmpSwitchCaseToStart$10 <= 1;
        const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$12 = $$0;
          let tmpSwitchCaseToStart$12 = $$1;
          let tmpBinLhs$17 = $$2;
          let tmpIfTest$28 = $$3;
          let tmpIfTest$29 = $$4;
          let tmpIfTest$30 = $$5;
          debugger;
          $('keep, eval');
        };
        const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$13 = $$0;
          let tmpSwitchCaseToStart$13 = $$1;
          let tmpBinLhs$18 = $$2;
          let tmpIfTest$31 = $$3;
          let tmpIfTest$32 = $$4;
          let tmpIfTest$33 = $$5;
          debugger;
          const tmpIfTest$34 = tmpSwitchCaseToStart$13 <= 2;
          const tmpBranchingA$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$15 = $$0;
            let tmpSwitchCaseToStart$15 = $$1;
            let tmpBinLhs$20 = $$2;
            let tmpIfTest$38 = $$3;
            let tmpIfTest$39 = $$4;
            let tmpIfTest$40 = $$5;
            let tmpIfTest$41 = $$6;
            debugger;
            $('keep, do not eval');
            const tmpReturnArg$10 = $(2, 'ret');
            return tmpReturnArg$10;
          };
          const tmpBranchingB$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$16 = $$0;
            let tmpSwitchCaseToStart$16 = $$1;
            let tmpBinLhs$21 = $$2;
            let tmpIfTest$42 = $$3;
            let tmpIfTest$43 = $$4;
            let tmpIfTest$44 = $$5;
            let tmpIfTest$45 = $$6;
            debugger;
            const tmpReturnArg$11 = tmpBranchingC$4(
              tmpSwitchValue$16,
              tmpSwitchCaseToStart$16,
              tmpBinLhs$21,
              tmpIfTest$42,
              tmpIfTest$43,
              tmpIfTest$44,
              tmpIfTest$45,
            );
            return tmpReturnArg$11;
          };
          const tmpBranchingC$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$17 = $$0;
            let tmpSwitchCaseToStart$17 = $$1;
            let tmpBinLhs$22 = $$2;
            let tmpIfTest$46 = $$3;
            let tmpIfTest$47 = $$4;
            let tmpIfTest$48 = $$5;
            let tmpIfTest$49 = $$6;
            debugger;
            const tmpReturnArg$12 = tmpBranchingC$3(
              tmpSwitchValue$17,
              tmpSwitchCaseToStart$17,
              tmpBinLhs$22,
              tmpIfTest$46,
              tmpIfTest$47,
              tmpIfTest$48,
            );
            return tmpReturnArg$12;
          };
          if (tmpIfTest$34) {
            const tmpReturnArg$13 = tmpBranchingA$4(
              tmpSwitchValue$13,
              tmpSwitchCaseToStart$13,
              tmpBinLhs$18,
              tmpIfTest$31,
              tmpIfTest$32,
              tmpIfTest$33,
              tmpIfTest$34,
            );
            return tmpReturnArg$13;
          } else {
            const tmpReturnArg$14 = tmpBranchingB$4(
              tmpSwitchValue$13,
              tmpSwitchCaseToStart$13,
              tmpBinLhs$18,
              tmpIfTest$31,
              tmpIfTest$32,
              tmpIfTest$33,
              tmpIfTest$34,
            );
            return tmpReturnArg$14;
          }
        };
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$14 = $$0;
          let tmpSwitchCaseToStart$14 = $$1;
          let tmpBinLhs$19 = $$2;
          let tmpIfTest$35 = $$3;
          let tmpIfTest$36 = $$4;
          let tmpIfTest$37 = $$5;
          debugger;
          const tmpReturnArg$15 = tmpBranchingC$2(tmpSwitchValue$14, tmpSwitchCaseToStart$14, tmpBinLhs$19, tmpIfTest$35, tmpIfTest$36);
          return tmpReturnArg$15;
        };
        if (tmpIfTest$24) {
          const tmpReturnArg$16 = tmpBranchingA$3(
            tmpSwitchValue$10,
            tmpSwitchCaseToStart$10,
            tmpBinLhs$15,
            tmpIfTest$22,
            tmpIfTest$23,
            tmpIfTest$24,
          );
          return tmpReturnArg$16;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$3(
            tmpSwitchValue$10,
            tmpSwitchCaseToStart$10,
            tmpBinLhs$15,
            tmpIfTest$22,
            tmpIfTest$23,
            tmpIfTest$24,
          );
          return tmpReturnArg$17;
        }
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$11 = $$0;
        let tmpSwitchCaseToStart$11 = $$1;
        let tmpBinLhs$16 = $$2;
        let tmpIfTest$26 = $$3;
        let tmpIfTest$27 = $$4;
        debugger;
        const tmpReturnArg$18 = tmpAfterLabel(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpBinLhs$16, tmpIfTest$26);
        return tmpReturnArg$18;
      };
      if (tmpIfTest$17) {
        const tmpReturnArg$19 = tmpBranchingA$2(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$13, tmpIfTest$16, tmpIfTest$17);
        return tmpReturnArg$19;
      } else {
        const tmpReturnArg$20 = tmpBranchingB$2(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpBinLhs$13, tmpIfTest$16, tmpIfTest$17);
        return tmpReturnArg$20;
      }
    };
    const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpBinLhs$12 = $$2;
      let tmpIfTest$15 = $$3;
      debugger;
      $('eliminate after switch');
    };
    const tmpReturnArg$21 = tmpLabeledBlockFunc(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$5, tmpIfTest$5);
    return tmpReturnArg$21;
  };
  if (tmpIfTest) {
    const tmpReturnArg$22 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$22;
  } else {
    const tmpReturnArg$23 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
    return tmpReturnArg$23;
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
  const tmpBranchingB = function ($$0, $$1) {
    const tmpSwitchValue$2 = $$0;
    const tmpSwitchCaseToStart$2 = $$1;
    debugger;
    const tmpBinLhs$4 = $(1);
    const tmpIfTest$4 = tmpBinLhs$4 === tmpSwitchValue$2;
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingC(1);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingC(tmpSwitchCaseToStart$2);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function ($$0) {
    const tmpSwitchCaseToStart$3 = $$0;
    debugger;
    const tmpIfTest$17 = tmpSwitchCaseToStart$3 <= 0;
    const tmpBranchingB$2 = function ($$0) {
      const tmpSwitchCaseToStart$10 = $$0;
      debugger;
      const tmpIfTest$24 = tmpSwitchCaseToStart$10 <= 1;
      const tmpBranchingB$3 = function ($$0) {
        const tmpSwitchCaseToStart$13 = $$0;
        debugger;
        const tmpIfTest$34 = tmpSwitchCaseToStart$13 <= 2;
        if (tmpIfTest$34) {
          $('keep, do not eval');
          const tmpReturnArg$10 = $(2, 'ret');
          return tmpReturnArg$10;
        } else {
          $('eliminate after switch');
          return undefined;
        }
      };
      if (tmpIfTest$24) {
        $('keep, eval');
        return undefined;
      } else {
        const tmpReturnArg$17 = tmpBranchingB$3(tmpSwitchCaseToStart$10);
        return tmpReturnArg$17;
      }
    };
    if (tmpIfTest$17) {
      $('keep, do not eval');
      return undefined;
    } else {
      const tmpReturnArg$2 = tmpBranchingB$2(tmpSwitchCaseToStart$3);
      return tmpReturnArg$2;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$22 = tmpBranchingC(0);
    return tmpReturnArg$22;
  } else {
    const tmpReturnArg$23 = tmpBranchingB(tmpSwitchValue, 2);
    return tmpReturnArg$23;
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
 - 3: 1
 - 4: 'keep, eval'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
