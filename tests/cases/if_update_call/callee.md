# Preval test case

# callee.md

> If update call > Callee
>
> If a variable is conditionally set and then used in a call after the `if`/`else`, we can hoist the call inside those branches.

#TODO

## Input

`````js filename=intro
function f(){ $('f'); }
function g(){ $('f'); }
let x = undefined;
if ($(true)) {
  x = f;
} else {
  x = g;
}
x();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $('f');
};
let g = function () {
  debugger;
  $('f');
};
let x = undefined;
if ($(true)) {
  x = f;
} else {
  x = g;
}
x();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $('f');
  return undefined;
};
let g = function () {
  debugger;
  $('f');
  return undefined;
};
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = f;
} else {
  x = g;
}
x();
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $('f');
} else {
  $('f');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
