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
  const tmpBranchingC = function () {
    $('after');
  };
  const tmpLabeledBlockFunc = function () {
    const tmpIfTest$1 = $(true);
    const tmpBranchingA = function (tmpIfTest$2) {
      $(100);
      return 20;
    };
    const tmpBranchingB = function (tmpIfTest$3) {
      const tmpReturnArg = tmpBranchingC$1(tmpIfTest$3);
      return tmpReturnArg;
    };
    const tmpBranchingC$1 = function (tmpIfTest$4) {
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$2 = tmpBranchingA(tmpIfTest$1);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingB(tmpIfTest$1);
      return tmpReturnArg$3;
    }
  };
  const tmpReturnArg$4 = tmpLabeledBlockFunc();
  return tmpReturnArg$4;
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
