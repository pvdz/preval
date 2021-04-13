# Preval test case

# base_falsey.md

> Typing > Base falsey
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
f($(1));
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
f($(1));
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
const tmpCalleeParam = $(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const b = tmpCalleeParam === 10;
if (b) {
  $('a', true);
  $(true);
  $(true);
  $(true);
} else {
  $('b', false);
  $(false);
  $(false);
  $(false);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'b', false
 - 3: false
 - 4: false
 - 5: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
