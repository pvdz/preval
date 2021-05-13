# Preval test case

# if_mutates_break_else_no_complete.md

> Flow > If mutates break else no complete
>
> The mechanism has to consider that the if didn't complete in both branches, but may only have mutated the binding after the label node (and of course inside the branch that breaks until it breaks). Point is that it shouldn't skip the `else` branch.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'pass';
  foo: {
    if ($(true)) {
      $(x, 'not mutating, not completing');
    } else {
      x = 'fail';
      break foo;
    }
    $(x, 'should not be considered mutated');
  }
  // Consider x mutated here
  $(x, 'after label');
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 'pass';
  foo: {
    if ($(true)) {
      $(x, 'not mutating, not completing');
    } else {
      x = 'fail';
      break foo;
    }
    $(x, 'should not be considered mutated');
  }
  $(x, 'after label');
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
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x$3, 'not mutating, not completing');
    } else {
      x$3 = 'fail';
      const tmpReturnArg = tmpAfterLabel(x$3);
      return tmpReturnArg;
    }
    $(x$3, 'should not be considered mutated');
    const tmpReturnArg$1 = tmpAfterLabel(x$3);
    return tmpReturnArg$1;
  };
  const tmpAfterLabel = function ($$0) {
    let x$1 = $$0;
    debugger;
    $(x$1, 'after label');
    return undefined;
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc(x);
  return tmpReturnArg$3;
};
f();
`````

## Output

`````js filename=intro
const tmpAfterLabel = function ($$0) {
  const x$1 = $$0;
  debugger;
  $(x$1, 'after label');
  return undefined;
};
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $('pass', 'not mutating, not completing');
  $('pass', 'should not be considered mutated');
  tmpAfterLabel('pass');
} else {
  tmpAfterLabel('fail');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'pass', 'not mutating, not completing'
 - 3: 'pass', 'should not be considered mutated'
 - 4: 'pass', 'after label'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
