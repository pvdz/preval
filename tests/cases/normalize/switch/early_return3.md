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
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpIfTest$8 = $$2;
    debugger;
    const tmpIfTest$10 = 1 === tmpSwitchValue$3;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpIfTest$22 = $$2;
      let tmpIfTest$24 = $$3;
      debugger;
      tmpSwitchCaseToStart$7 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$22, tmpIfTest$24);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$9 = $$0;
      let tmpSwitchCaseToStart$9 = $$1;
      let tmpIfTest$26 = $$2;
      let tmpIfTest$28 = $$3;
      debugger;
      const tmpIfTest$30 = 2 === tmpSwitchValue$9;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$13 = $$0;
        let tmpSwitchCaseToStart$13 = $$1;
        let tmpIfTest$36 = $$2;
        let tmpIfTest$38 = $$3;
        let tmpIfTest$40 = $$4;
        debugger;
        tmpSwitchCaseToStart$13 = 2;
        const tmpReturnArg$3 = tmpBranchingC$3(tmpSwitchValue$13, tmpSwitchCaseToStart$13, tmpIfTest$36, tmpIfTest$38, tmpIfTest$40);
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpIfTest$42 = $$2;
        let tmpIfTest$44 = $$3;
        let tmpIfTest$46 = $$4;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$3(tmpSwitchValue$15, tmpSwitchCaseToStart$15, tmpIfTest$42, tmpIfTest$44, tmpIfTest$46);
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$17 = $$0;
        let tmpSwitchCaseToStart$17 = $$1;
        let tmpIfTest$48 = $$2;
        let tmpIfTest$50 = $$3;
        let tmpIfTest$52 = $$4;
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$1(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$48, tmpIfTest$50);
        return tmpReturnArg$7;
      };
      if (tmpIfTest$30) {
        const tmpReturnArg$9 = tmpBranchingA$3(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$26, tmpIfTest$28, tmpIfTest$30);
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3(tmpSwitchValue$9, tmpSwitchCaseToStart$9, tmpIfTest$26, tmpIfTest$28, tmpIfTest$30);
        return tmpReturnArg$11;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$11 = $$0;
      let tmpSwitchCaseToStart$11 = $$1;
      let tmpIfTest$32 = $$2;
      let tmpIfTest$34 = $$3;
      debugger;
      const tmpReturnArg$13 = tmpBranchingC(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpIfTest$32);
      return tmpReturnArg$13;
    };
    if (tmpIfTest$10) {
      const tmpReturnArg$15 = tmpBranchingA$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$8, tmpIfTest$10);
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$8, tmpIfTest$10);
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpSwitchValue$5 = $$0;
    let tmpSwitchCaseToStart$5 = $$1;
    let tmpIfTest$14 = $$2;
    debugger;
    const tmpIfTest$16 = tmpSwitchCaseToStart$5 <= 0;
    const tmpIfTest$18 = tmpSwitchCaseToStart$5 <= 1;
    if (tmpIfTest$18) {
      return 6;
    } else {
      const tmpIfTest$20 = tmpSwitchCaseToStart$5 <= 2;
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
