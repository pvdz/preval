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
  let x = `fail`;
  foo: {
    bar: {
      if ($(false)) break foo;
      else break bar;
    }
    x = `pass`;
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpAfterLabel$1 = function ($$0, $$1) {
    let tmpAfterLabel$3 = $$0;
    let x$3 = $$1;
    debugger;
    x$3 = `pass`;
    const tmpReturnArg$3 = tmpAfterLabel$3(x$3);
    return tmpReturnArg$3;
  };
  const tmpAfterLabel = function ($$0) {
    let x$1 = $$0;
    debugger;
    $(x$1);
    return undefined;
  };
  let x = `fail`;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    const tmpReturnArg = tmpAfterLabel(x);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpAfterLabel$1(tmpAfterLabel, x);
    return tmpReturnArg$1;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "fail" );
}
else {
  $( "pass" );
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
