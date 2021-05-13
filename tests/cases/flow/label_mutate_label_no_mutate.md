# Preval test case

# label_mutate_label_no_mutate.md

> Flow > Label mutate label no mutate
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  foo: {
    bar: {
      if ($) {
        x = 'pass';
        break foo;
      } else {
        break bar;
      }
    }
    // Do not consider x mutated here
    $(x);
  }
  // Consider x mutated here
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
      if ($) {
        x = 'pass';
        break foo;
      } else {
        break bar;
      }
    }
    $(x);
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
      if ($) {
        x$7 = 'pass';
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
      $(x$5);
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
const tmpAfterLabel$1 = function ($$0) {
  const x$5 = $$0;
  debugger;
  $(x$5);
  tmpAfterLabel(x$5);
  return undefined;
};
const tmpLabeledBlockFunc = function ($$0) {
  const x$3 = $$0;
  debugger;
  let x$7 = x$3;
  if ($) {
    x$7 = 'pass';
    tmpAfterLabel('pass');
    return undefined;
  } else {
    tmpAfterLabel$1(x$7);
    return undefined;
  }
  tmpAfterLabel$1(x$7);
  return undefined;
};
const tmpAfterLabel = function ($$0) {
  const x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
tmpLabeledBlockFunc('fail');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same