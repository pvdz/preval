# Preval test case

# break_problem_true.md

> Flow > Break problem true
>
> Must track all labeled breaks when checking if a binding is mutated

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'pass';
  foo: {
    bar: {
      if ($(true)) break foo;
      else break bar;
    }
    x = 'fail'; // Not visited
  }
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 'pass';
  foo: {
    bar: {
      if ($(true)) break foo;
      else break bar;
    }
    x = 'fail';
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 'pass';
  const tmpLabeledBlockFunc = function ($$0) {
    let x$3 = $$0;
    debugger;
    const tmpLabeledBlockFunc$1 = function ($$0) {
      let x$7 = $$0;
      debugger;
      const tmpIfTest$3 = $(true);
      if (tmpIfTest$3) {
        const tmpReturnArg$1 = tmpAfterLabel(x$7);
        return tmpReturnArg$1;
      } else {
        const tmpReturnArg$3 = tmpAfterLabel$1(x$7);
        return tmpReturnArg$3;
      }
      const tmpReturnArg$5 = tmpAfterLabel$1(x$7);
      return tmpReturnArg$5;
    };
    const tmpAfterLabel$1 = function ($$0) {
      let x$5 = $$0;
      debugger;
      x$5 = 'fail';
      const tmpReturnArg$7 = tmpAfterLabel(x$5);
      return tmpReturnArg$7;
    };
    const tmpReturnArg$9 = tmpLabeledBlockFunc$1(x$3);
    return tmpReturnArg$9;
  };
  const tmpAfterLabel = function ($$0) {
    let x$1 = $$0;
    debugger;
    $(x$1);
    return undefined;
  };
  const tmpReturnArg$11 = tmpLabeledBlockFunc(x);
  return tmpReturnArg$11;
};
f();
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc = function () {
  debugger;
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    tmpAfterLabel('pass');
    return undefined;
  } else {
    tmpAfterLabel('fail');
    return undefined;
  }
  tmpAfterLabel('fail');
  return undefined;
};
const tmpAfterLabel = function ($$0) {
  const x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
tmpLabeledBlockFunc();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
