# Preval test case

# early_return5.md

> Normalize > Switch > Early return5
>
> Sorting out the branching stuff

One fewer nesting

#TODO

## Input

`````js filename=intro
let f = function () {
  const x = 0;
  if (x) {
    $('a')
  } else {
    const y = 1;
    if (y) {
      $('b')
    } else {
      $('c')
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const x = 0;
  if (x) {
    $('a');
  } else {
    const y = 1;
    if (y) {
      $('b');
    } else {
      $('c');
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  const x = 0;
  const tmpBranchingA = function (x$1) {
    $('a');
    const tmpReturnArg = tmpBranchingC(x$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (x$2) {
    const y$1 = 1;
    const tmpBranchingA$1 = function (x$4, y$2) {
      $('b');
      const tmpReturnArg$1 = tmpBranchingC$1(x$4, y$2);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (x$5, y$3) {
      $('c');
      const tmpReturnArg$2 = tmpBranchingC$1(x$5, y$3);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function (x$6, y$4) {
      $('after inner');
      const tmpReturnArg$3 = tmpBranchingC(x$6);
      return tmpReturnArg$3;
    };
    if (y$1) {
      const tmpReturnArg$4 = tmpBranchingA$1(x$2, y$1);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(x$2, y$1);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function (x$3) {
    $('after outer');
  };
  if (x) {
    const tmpReturnArg$6 = tmpBranchingA(x);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(x);
    return tmpReturnArg$7;
  }
};
f();
`````

## Output

`````js filename=intro
$('b');
$('after inner');
$('after outer');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - 2: 'after inner'
 - 3: 'after outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
