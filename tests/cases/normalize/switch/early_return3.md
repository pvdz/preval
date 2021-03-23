# Preval test case

# early_return3.md

> Normalize > Switch > Early return3
>
> Sorting out the branching stuff

(This is the intermediate step without if-else branch reduction)

#TODO

## Input

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$2 = 2 === tmpSwitchValue;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      }
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    return 6;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$2 = 2 === tmpSwitchValue;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      }
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    return 6;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
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
    let tmpIfTest$6 = $$2;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$6);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpSwitchValue$2 = $$0;
    let tmpSwitchCaseToStart$2 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    const tmpIfTest$8 = 1 === tmpSwitchValue$2;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$4 = $$0;
      let tmpSwitchCaseToStart$4 = $$1;
      let tmpIfTest$14 = $$2;
      let tmpIfTest$15 = $$3;
      debugger;
      tmpSwitchCaseToStart$4 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$4, tmpSwitchCaseToStart$4, tmpIfTest$14, tmpIfTest$15);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$5 = $$0;
      let tmpSwitchCaseToStart$5 = $$1;
      let tmpIfTest$16 = $$2;
      let tmpIfTest$17 = $$3;
      debugger;
      const tmpIfTest$18 = 2 === tmpSwitchValue$5;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$7 = $$0;
        let tmpSwitchCaseToStart$7 = $$1;
        let tmpIfTest$21 = $$2;
        let tmpIfTest$22 = $$3;
        let tmpIfTest$23 = $$4;
        debugger;
        tmpSwitchCaseToStart$7 = 2;
        const tmpReturnArg$2 = tmpBranchingC$2(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$21, tmpIfTest$22, tmpIfTest$23);
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$8 = $$0;
        let tmpSwitchCaseToStart$8 = $$1;
        let tmpIfTest$24 = $$2;
        let tmpIfTest$25 = $$3;
        let tmpIfTest$26 = $$4;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$2(tmpSwitchValue$8, tmpSwitchCaseToStart$8, tmpIfTest$24, tmpIfTest$25, tmpIfTest$26);
        return tmpReturnArg$3;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$9 = $$0;
        let tmpSwitchCaseToStart$9 = $$1;
        let tmpIfTest$27 = $$2;
        let tmpIfTest$28 = $$3;
        let tmpIfTest$29 = $$4;
        debugger;
        const tmpReturnArg$4 = tmpBranchingC$1(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$27, tmpIfTest$28);
        return tmpReturnArg$4;
      };
      if (tmpIfTest$18) {
        const tmpReturnArg$5 = tmpBranchingA$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$16, tmpIfTest$17, tmpIfTest$18);
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$6 = tmpBranchingB$2(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$16, tmpIfTest$17, tmpIfTest$18);
        return tmpReturnArg$6;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$6 = $$0;
      let tmpSwitchCaseToStart$6 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpIfTest$20 = $$3;
      debugger;
      const tmpReturnArg$7 = tmpBranchingC(tmpSwitchValue$6, tmpSwitchCaseToStart$6, tmpIfTest$19);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$8) {
      const tmpReturnArg$8 = tmpBranchingA$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$7, tmpIfTest$8);
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpSwitchValue$2, tmpSwitchCaseToStart$2, tmpIfTest$7, tmpIfTest$8);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpIfTest$10 = $$2;
    debugger;
    const tmpIfTest$11 = tmpSwitchCaseToStart$3 <= 0;
    const tmpIfTest$12 = tmpSwitchCaseToStart$3 <= 1;
    if (tmpIfTest$12) {
      return 6;
    } else {
      const tmpIfTest$13 = tmpSwitchCaseToStart$3 <= 2;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$11;
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
