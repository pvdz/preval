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
    let v$2 = $$0;
    let x$2 = $$1;
    debugger;
    const y$1 = 2 === v$2;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let v$4 = $$0;
      let x$4 = $$1;
      let y$2 = $$2;
      debugger;
      $(1);
      const tmpReturnArg$1 = tmpBranchingC$1(v$4, x$4, y$2);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$2 = function ($$0, $$1, $$2) {
      let v$5 = $$0;
      let x$5 = $$1;
      let y$3 = $$2;
      debugger;
      $(2);
      const tmpReturnArg$2 = tmpBranchingC$1(v$5, x$5, y$3);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let v$6 = $$0;
      let x$6 = $$1;
      let y$4 = $$2;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(v$6, x$6);
      return tmpReturnArg$3;
    };
    if (y$1) {
      const tmpReturnArg$4 = tmpBranchingA$1(v$2, x$2, y$1);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$2(v$2, x$2, y$1);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function ($$0, $$1) {
    let v$3 = $$0;
    let x$3 = $$1;
    debugger;
  };
  if (x) {
    const tmpReturnArg$6 = tmpBranchingA(v, x);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB$1(v, x);
    return tmpReturnArg$7;
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
