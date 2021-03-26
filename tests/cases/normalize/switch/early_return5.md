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
  debugger;
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
  debugger;
  const x = 0;
  const tmpBranchingA = function ($$0) {
    let x$1 = $$0;
    debugger;
    $('a');
    const tmpReturnArg = tmpBranchingC(x$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let x$3 = $$0;
    debugger;
    const y$1 = 1;
    const tmpBranchingA$1 = function ($$0, $$1) {
      let x$7 = $$0;
      let y$3 = $$1;
      debugger;
      $('b');
      const tmpReturnArg$1 = tmpBranchingC$1(x$7, y$3);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let x$9 = $$0;
      let y$5 = $$1;
      debugger;
      $('c');
      const tmpReturnArg$3 = tmpBranchingC$1(x$9, y$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let x$11 = $$0;
      let y$7 = $$1;
      debugger;
      $('after inner');
      const tmpReturnArg$5 = tmpBranchingC(x$11);
      return tmpReturnArg$5;
    };
    if (y$1) {
      const tmpReturnArg$7 = tmpBranchingA$1(x$3, y$1);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(x$3, y$1);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function ($$0) {
    let x$5 = $$0;
    debugger;
    $('after outer');
  };
  if (x) {
    const tmpReturnArg$11 = tmpBranchingA(x);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(x);
    return tmpReturnArg$13;
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
