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

## Normalized

`````js filename=intro
const tmpBranchingB = function (v) {
  const x = 1 === v;
  const tmpBranchingA = function (v$1, x$1) {
    $(0);
    const tmpReturnArg = tmpBranchingC(v$1, x$1);
    return tmpReturnArg;
  };
  const tmpBranchingB$1 = function (v$2, x$2) {
    const y$1 = 2 === v$2;
    const tmpBranchingA$1 = function (v$4, x$4, y$2) {
      $(1);
      const tmpReturnArg$1 = tmpBranchingC$1(v$4, x$4, y$2);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$2 = function (v$5, x$5, y$3) {
      $(2);
      const tmpReturnArg$2 = tmpBranchingC$1(v$5, x$5, y$3);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function (v$6, x$6, y$4) {
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
  const tmpBranchingC = function (v$3, x$3) {};
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
const tmpBranchingB = function (v) {
  const x = 1 === v;
  const tmpBranchingB$1 = function (v$2) {
    const y$1 = 2 === v$2;
    if (y$1) {
      $(1);
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  };
  if (x) {
    $(0);
    return undefined;
  } else {
    const tmpReturnArg$7 = tmpBranchingB$1(v);
    return tmpReturnArg$7;
  }
};
const tmpReturnArg$11 = tmpBranchingB(1);
$(tmpReturnArg$11);
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
