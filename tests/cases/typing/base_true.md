# Preval test case

# base_true.md

> Typing > Base true
>
> We want to track the type of bindings when we can, and maybe even limit it to a particular set when feasible

#TODO

## Input

`````js filename=intro
function g(arg) {
  $(arg);
  $(arg);
  $(arg);
}
function f(x) {
  // The idea is that we know `b` is `true` or `false`
  const b = x === 10;
  // And we know that we'll _know_ the value of `b` inside each branch
  if (b) {
    $('a', b);
    return g(b);
  } else {
    $('b', b);
    return g(b);
  }
}
f($(10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const b = x === 10;
  if (b) {
    $('a', b);
    return g(b);
  } else {
    $('b', b);
    return g(b);
  }
};
let g = function ($$0) {
  let arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
};
f($(10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const b = x === 10;
  if (b) {
    $('a', b);
    const tmpReturnArg = g(b);
    return tmpReturnArg;
  } else {
    $('b', b);
    const tmpReturnArg$1 = g(b);
    return tmpReturnArg$1;
  }
};
let g = function ($$0) {
  let arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCallCallee = f;
const tmpCalleeParam = $(10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const g = function ($$0) {
  const arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam = $(10);
const b = tmpCalleeParam === 10;
if (b) {
  $('a', b);
  g(b);
} else {
  $('b', b);
  g(b);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 'a', true
 - 3: true
 - 4: true
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same