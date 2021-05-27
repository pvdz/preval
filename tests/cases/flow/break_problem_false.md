# Preval test case

# break_problem_false.md

> Flow > Break problem false
>
> Must track all labeled breaks when checking if a binding is mutated

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  foo: {
    bar: {
      if ($(false)) break foo;
      else break bar;
    }
    x = 'pass'; // Visited
  }
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 'fail';
  foo: {
    bar: {
      if ($(false)) break foo;
      else break bar;
    }
    x = 'pass';
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 'fail';
  const tmpLabeledBlockFunc = function ($$0) {
    let x$3 = $$0;
    debugger;
    const tmpLabeledBlockFunc$1 = function ($$0) {
      let x$7 = $$0;
      debugger;
      const tmpIfTest$3 = $(false);
      if (tmpIfTest$3) {
        const tmpReturnArg$1 = tmpAfterLabel(x$7);
        return tmpReturnArg$1;
      } else {
        const tmpReturnArg$3 = tmpAfterLabel$1(x$7);
        return tmpReturnArg$3;
      }
    };
    const tmpAfterLabel$1 = function ($$0) {
      let x$5 = $$0;
      debugger;
      x$5 = 'pass';
      const tmpReturnArg$5 = tmpAfterLabel(x$5);
      return tmpReturnArg$5;
    };
    const tmpReturnArg$7 = tmpLabeledBlockFunc$1(x$3);
    return tmpReturnArg$7;
  };
  const tmpAfterLabel = function ($$0) {
    let x$1 = $$0;
    debugger;
    $(x$1);
    return undefined;
  };
  const tmpReturnArg$9 = tmpLabeledBlockFunc(x);
  return tmpReturnArg$9;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest$3 = $(false);
if (tmpIfTest$3) {
  $('fail');
} else {
  $('pass');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
