# Preval test case

# callee.md

> If update var > Callee
>
> If a variable is conditionally set and then used in a binding after the `if`/`else`, we may be able to hoist the binding inside those branches.

#TODO

## Input

`````js filename=intro
function f(){ $('f'); }
function g(){ $('g'); }
let x = undefined;
if ($(true)) {
  x = f;
} else {
  x = g;
}
const y = x;
y();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(`f`);
};
let g = function () {
  debugger;
  $(`g`);
};
let x = undefined;
if ($(true)) {
  x = f;
} else {
  x = g;
}
const y = x;
y();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(`f`);
  return undefined;
};
let g = function () {
  debugger;
  $(`g`);
  return undefined;
};
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = f;
} else {
  x = g;
}
const y = x;
y();
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`f`);
} else {
  $(`g`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "f" );
}
else {
  $( "g" );
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
