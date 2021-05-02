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
    if (tmpIfTest$1) {
      $(100);
      const tmpReturnArg = tmpAfterLabel();
      return tmpReturnArg;
    } else {
    }
    $('else');
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
const tmpAfterLabel = function () {
  debugger;
  $('after');
  return undefined;
};
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $(100);
  tmpAfterLabel();
} else {
  $('else');
  tmpAfterLabel();
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
