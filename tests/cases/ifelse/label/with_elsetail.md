# Preval test case

# with_elsetail.md

> Ifelse > Label > With elsetail
>
> whoa

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      break foo;
    }
    $('else');
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
      break foo;
    }
    $('else');
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
    const tmpBranchingA = function () {
      debugger;
      $(100);
      const tmpReturnArg$1 = tmpAfterLabel();
      return tmpReturnArg$1;
    };
    const tmpBranchingB = function () {
      debugger;
      $('else');
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    const tmpBranchingC = function () {
      debugger;
      const tmpReturnArg$5 = tmpAfterLabel();
      return tmpReturnArg$5;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$7 = tmpBranchingA();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB();
      return tmpReturnArg$9;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $('after');
  };
  const tmpReturnArg$11 = tmpLabeledBlockFunc();
  return tmpReturnArg$11;
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
  $('else');
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
