# Preval test case

# another_problem.md

> Bool trampoline > Another problem
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.

#TODO

## Input

`````js filename=intro
let x;
function f() {
  x = $(100);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass');
else $('fail');
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  x = $(100);
  const y = Boolean(x);
  return y;
};
let x;
$(f);
$(f);
if (f()) $(`pass`);
else $(`fail`);
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  x = $(100);
  const y = Boolean(x);
  return y;
};
let x = undefined;
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
$(x);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  x = $(100);
  const y = Boolean(x);
  return y;
};
let x = undefined;
$(f);
$(f);
const tmpBoolTrampoline = $(100);
if (tmpBoolTrampoline) {
  $(`pass`);
} else {
  $(`fail`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = $( 100 );
  const c = Boolean( b );
  return c;
},;
let b = undefined;
$( a );
$( a );
const d = $( 100 );
if (d) {
  $( "pass" );
}
else {
  $( "fail" );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: '<function>'
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - 5: undefined
 - eval returned: undefined
