# Preval test case

# early_break.md

> Ifelse > Label > Early break
>
> 

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      break foo;
      $('fail');
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
      break foo;
      $('fail');
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
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    };
    const tmpBranchingB = function (tmpIfTest$3) {
      const tmpReturnArg$2 = tmpBranchingC$1(tmpIfTest$3);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function (tmpIfTest$4) {
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$4 = tmpBranchingA(tmpIfTest$1);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB(tmpIfTest$1);
      return tmpReturnArg$5;
    }
  };
  const tmpReturnArg$6 = tmpLabeledBlockFunc();
  return tmpReturnArg$6;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $(100);
  $('after');
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
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
