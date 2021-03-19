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

## Output

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
