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
  const tmpBranchingA = function ($$0, $$1) {
    let v$1 = $$0;
    let x$1 = $$1;
    debugger;
    $(0);
    const tmpReturnArg = tmpBranchingC(v$1, x$1);
    return tmpReturnArg;
  };
  const tmpBranchingB$1 = function ($$0, $$1) {
    let v$3 = $$0;
    let x$3 = $$1;
    debugger;
    const y$1 = 2 === v$3;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let v$7 = $$0;
      let x$7 = $$1;
      let y$3 = $$2;
      debugger;
      $(1);
      const tmpReturnArg$1 = tmpBranchingC$1(v$7, x$7, y$3);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$3 = function ($$0, $$1, $$2) {
      let v$9 = $$0;
      let x$9 = $$1;
      let y$5 = $$2;
      debugger;
      $(2);
      const tmpReturnArg$3 = tmpBranchingC$1(v$9, x$9, y$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let v$11 = $$0;
      let x$11 = $$1;
      let y$7 = $$2;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC(v$11, x$11);
      return tmpReturnArg$5;
    };
    if (y$1) {
      const tmpReturnArg$7 = tmpBranchingA$1(v$3, x$3, y$1);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$3(v$3, x$3, y$1);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function ($$0, $$1) {
    let v$5 = $$0;
    let x$5 = $$1;
    debugger;
  };
  if (x) {
    const tmpReturnArg$12 = tmpBranchingA(v, x);
    return tmpReturnArg$12;
  } else {
    const tmpReturnArg$14 = tmpBranchingB$1(v, x);
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
