# Preval test case

# early_return_without_elim.md

> Ifelse > Label > Early return without elim
>
> Early return in labeled if-else such that it won't just be eliminated through DCE

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      return 20;
      break foo;
    } else {
      $(101);
      break foo;
    }
  }
  $('after');
}

f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    if ($(true)) {
      $(100);
      return 20;
      break foo;
    } else {
      $(101);
      break foo;
    }
  }
  $('after');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpLabeledBlockFunc = function () {
    debugger;
    const tmpIfTest$1 = $(true);
    const tmpBranchingA = function ($$0) {
      let tmpIfTest$2 = $$0;
      debugger;
      $(100);
      return 20;
    };
    const tmpBranchingB = function ($$0) {
      let tmpIfTest$3 = $$0;
      debugger;
      $(101);
      const tmpReturnArg$1 = tmpAfterLabel();
      return tmpReturnArg$1;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$4 = $$0;
      debugger;
      const tmpReturnArg$2 = tmpAfterLabel();
      return tmpReturnArg$2;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$3 = tmpBranchingA(tmpIfTest$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB(tmpIfTest$1);
      return tmpReturnArg$4;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $('after');
  };
  const tmpReturnArg$5 = tmpLabeledBlockFunc();
  return tmpReturnArg$5;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $(100);
} else {
  $(101);
  $('after');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
