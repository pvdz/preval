# Preval test case

# if-else.md

> Let aliases > If-else
>
> When two const bindings are assigned the same value, they are an alias

## Input

`````js filename=intro
let x = $(1);
function f() {
  x = 2;
  f = function(){ return x };
  return f();
}
// a and b are clearly an alias
const a = x;
if ($) {
  const b = x;
  $(a, b);
} else {
  const c = x;
  $(a, c);
}
$(f);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  return f();
};
let x = $(1);
const a = x;
if ($) {
  const b = x;
  $(a, b);
} else {
  const c = x;
  $(a, c);
}
$(f);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
let x = $(1);
const a = x;
if ($) {
  const b = x;
  $(a, b);
} else {
  const c = x;
  $(a, c);
}
$(f);
`````

## Output

`````js filename=intro
let f = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
let x = $(1);
$(x, x);
$(f);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
