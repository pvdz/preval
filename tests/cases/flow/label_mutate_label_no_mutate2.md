# Preval test case

# label_mutate_label_no_mutate2.md

> Flow > Label mutate label no mutate2
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
const f = function() {
  debugger;
  const tmpAfterLabel$1 = function($$0, $$1) {
    let tmpAfterLabel2 = $$0;
    let x = $$1;
    debugger;
    $(x);
    const tmpReturnArg$3 = tmpAfterLabel2(x);
    return tmpReturnArg$3;
  };
  const tmpAfterLabel = function($$0) {
    let x = $$0;
    debugger;
    $(x);
    return undefined;
  };
  let x = `fail`;
  if ($) {
    x = `pass`;
    const tmpReturnArg = tmpAfterLabel(`pass`);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpAfterLabel$1(tmpAfterLabel, x);
    return tmpReturnArg$1;
  }
};
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const tmpAfterLabel$1 = function ($$0, $$1) {
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    let tmpAfterLabel2 = $dlr_$$0;
    let x$1 = $dlr_$$1;
    $(x$1);
    const tmpReturnArg$3 = tmpAfterLabel2(x$1);
    return tmpReturnArg$3;
  };
  const tmpAfterLabel = function ($$0) {
    let $dlr_$$2 = $$0;
    debugger;
    let x$3 = $dlr_$$2;
    $(x$3);
    return undefined;
  };
  let x = `fail`;
  if ($) {
    x = `pass`;
    const tmpReturnArg = tmpAfterLabel(`pass`);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpAfterLabel$1(tmpAfterLabel, x);
    return tmpReturnArg$1;
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const tmpAfterLabel$1 = function ($$0, $$1) {
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    let tmpAfterLabel2 = $dlr_$$0;
    let x$1 = $dlr_$$1;
    $(x$1);
    const tmpReturnArg$3 = tmpAfterLabel2(x$1);
    return tmpReturnArg$3;
  };
  const tmpAfterLabel = function ($$0) {
    let $dlr_$$2 = $$0;
    debugger;
    let x$3 = $dlr_$$2;
    $(x$3);
    return undefined;
  };
  let x = `fail`;
  if ($) {
    x = `pass`;
    const tmpReturnArg = tmpAfterLabel(`pass`);
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
  const $dlr_$$1 = x;
  $($dlr_$$1);
  $($dlr_$$1);
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
