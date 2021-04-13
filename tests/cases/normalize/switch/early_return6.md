# Preval test case

# early_return6.md

> Normalize > Switch > Early return6
>
> Sorting out the branching stuff

Figuring out why nested if-elses remained in the output.

#TODO

## Input

`````js filename=intro
const tmpBranchingB = function (v) {
  const x = 1 === v;
  if (x) {
    $(0);
  } else {
    const y = 2 === v;
    if (y) {
      $(1);
    } else {
      $(2);
    }
  }
};
const tmpReturnArg$11 = tmpBranchingB(1);
$(tmpReturnArg$11);
`````

## Pre Normal

`````js filename=intro
const tmpBranchingB = function ($$0) {
  let v = $$0;
  debugger;
  const x = 1 === v;
  if (x) {
    $(0);
  } else {
    const y = 2 === v;
    if (y) {
      $(1);
    } else {
      $(2);
    }
  }
};
const tmpReturnArg$11 = tmpBranchingB(1);
$(tmpReturnArg$11);
`````

## Normalized

`````js filename=intro
const tmpBranchingB = function ($$0) {
  let v = $$0;
  debugger;
  const x = 1 === v;
  const tmpBranchingA = function () {
    debugger;
    $(0);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB$1 = function () {
    debugger;
    const y$1 = 2 === v;
    const tmpBranchingA$1 = function () {
      debugger;
      $(1);
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$3 = function () {
      debugger;
      $(2);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    };
    if (y$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$3();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (x) {
    const tmpReturnArg$12 = tmpBranchingA();
    return tmpReturnArg$12;
  } else {
    const tmpReturnArg$14 = tmpBranchingB$1();
    return tmpReturnArg$14;
  }
};
const tmpReturnArg$11 = tmpBranchingB(1);
$(tmpReturnArg$11);
`````

## Output

`````js filename=intro
$(0);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
