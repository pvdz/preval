# Preval test case

# base_inv_true.md

> Bool trampoline > Base inv true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.

#TODO

## Input

`````js filename=intro
function f() {
  const x = $(100);
  const y = !x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('fail');
else $('pass');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const x = $(100);
  const y = !x;
  return y;
};
$(f);
$(f);
if (f()) $(`fail`);
else $(`pass`);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const x = $(100);
  const y = !x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const x = $(100);
  const y = !x;
  return y;
};
$(f);
$(f);
const tmpBoolTrampoline = $(100);
if (tmpBoolTrampoline) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
