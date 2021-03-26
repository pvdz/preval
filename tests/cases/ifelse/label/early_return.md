# Preval test case

# early_return.md

> Ifelse > Label > Early return
>
> The label gets eliminated because DCE removes all usages of the label so it's removed

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      return 20;
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
      let tmpIfTest$3 = $$0;
      debugger;
      $(100);
      return 20;
    };
    const tmpBranchingB = function ($$0) {
      let tmpIfTest$5 = $$0;
      debugger;
      const tmpReturnArg = tmpBranchingC(tmpIfTest$5);
      return tmpReturnArg;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$7 = $$0;
      debugger;
      const tmpReturnArg$1 = tmpAfterLabel();
      return tmpReturnArg$1;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$3 = tmpBranchingA(tmpIfTest$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB(tmpIfTest$1);
      return tmpReturnArg$5;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $('after');
  };
  const tmpReturnArg$7 = tmpLabeledBlockFunc();
  return tmpReturnArg$7;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $(100);
} else {
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
