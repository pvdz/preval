# Preval test case

# early_return2.md

> Normalize > Switch > Early return2
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch (1) {
    case 0:
    case 1:
      return 6;
    case 2:
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = 1;
    let tmpSwitchCaseToStart = 3;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
      }
      if (tmpSwitchCaseToStart <= 1) {
        return 6;
      }
      if (tmpSwitchCaseToStart <= 2) {
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
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$5);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    const tmpIfTest$9 = 1 === tmpSwitchValue$3;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpIfTest$17 = $$3;
      debugger;
      tmpSwitchCaseToStart$7 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$15, tmpIfTest$17);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$9 = $$0;
      let tmpSwitchCaseToStart$9 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpIfTest$21 = $$3;
      debugger;
      const tmpIfTest$23 = 2 === tmpSwitchValue$9;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$13 = $$0;
        let tmpSwitchCaseToStart$13 = $$1;
        let tmpIfTest$29 = $$2;
        let tmpIfTest$31 = $$3;
        let tmpIfTest$33 = $$4;
        debugger;
        tmpSwitchCaseToStart$13 = 2;
        const tmpReturnArg$3 = tmpBranchingC$3(tmpSwitchValue$13, tmpSwitchCaseToStart$13, tmpIfTest$29, tmpIfTest$31, tmpIfTest$33);
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpIfTest$35 = $$2;
        let tmpIfTest$37 = $$3;
        let tmpIfTest$39 = $$4;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$3(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpIfTest$35, tmpIfTest$37, tmpIfTest$39);
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$17 = $$0;
        let tmpSwitchCaseToStart$17 = $$1;
        let tmpIfTest$41 = $$2;
        let tmpIfTest$43 = $$3;
        let tmpIfTest$45 = $$4;
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$1(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$41, tmpIfTest$43);
        return tmpReturnArg$7;
      };
      if (tmpIfTest$23) {
        const tmpReturnArg$9 = tmpBranchingA$3(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$19, tmpIfTest$21, tmpIfTest$23);
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$19, tmpIfTest$21, tmpIfTest$23);
        return tmpReturnArg$11;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$11 = $$0;
      let tmpSwitchCaseToStart$11 = $$1;
      let tmpIfTest$25 = $$2;
      let tmpIfTest$27 = $$3;
      debugger;
      const tmpReturnArg$13 = tmpBranchingC(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpIfTest$25);
      return tmpReturnArg$13;
    };
    if (tmpIfTest$9) {
      const tmpReturnArg$15 = tmpBranchingA$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$7, tmpIfTest$9);
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$7, tmpIfTest$9);
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpSwitchValue$5 = $$0;
    let tmpSwitchCaseToStart$5 = $$1;
    let tmpIfTest$13 = $$2;
    debugger;
    const tmpIfTest$47 = tmpSwitchCaseToStart$5 <= 0;
    const tmpIfTest$49 = tmpSwitchCaseToStart$5 <= 1;
    if (tmpIfTest$49) {
      return 6;
    } else {
      const tmpIfTest$51 = tmpSwitchCaseToStart$5 <= 2;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$21;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(6);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
