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
  let x = `fail`;
  foo: {
    bar: {
      if ($) {
        x = `pass`;
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
  const tmpAfterLabel$1 = function ($$0, $$1) {
    let tmpAfterLabel$3 = $$0;
    let x$3 = $$1;
    debugger;
    $(x$3);
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
  if ($) {
    x = `pass`;
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
let x = `fail`;
if ($) {
  x = `pass`;
  $(`pass`);
} else {
  const x$3 = x;
  $(x$3);
  $(x$3);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = "fail";
if ($) {
  a = "pass";
  $( "pass" );
}
else {
  const b = a;
  $( b );
  $( b );
}
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
