# Preval test case

# base_inv_false.md

> Bool trampoline > Base inv false
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.

#TODO

## Input

`````js filename=intro
function f() {
  const x = $(0);
  const y = !x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass');
else $('fail');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  const y = !x;
  return y;
};
$(f);
$(f);
if (f()) $(`pass`);
else $(`fail`);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  const y = !x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const x = $(0);
  const y = !x;
  return y;
};
$(f);
$(f);
const tmpBoolTrampoline = $(0);
if (tmpBoolTrampoline) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 0 );
  const c = !b;
  return c;
},;
$( a );
$( a );
const d = $( 0 );
if (d) {
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
 - 1: '<function>'
 - 2: '<function>'
 - 3: 0
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
