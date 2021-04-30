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
    if (tmpIfTest$1) {
      $(100);
      return 20;
    } else {
      $(101);
      const tmpReturnArg = tmpAfterLabel();
      return tmpReturnArg;
    }
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
  };
  const tmpAfterLabel = function () {
    debugger;
    $('after');
    return undefined;
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc();
  return tmpReturnArg$3;
};
f();
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc = function () {
  debugger;
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(100);
    return undefined;
  } else {
    $(101);
    tmpAfterLabel();
    return undefined;
  }
  tmpAfterLabel();
  return undefined;
};
const tmpAfterLabel = function () {
  debugger;
  $('after');
  return undefined;
};
tmpLabeledBlockFunc();
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
