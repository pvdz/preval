# Preval test case

# base_inv_true.md

> Bool trampoline > Base inv true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
>
> This case does not use the func arg.

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
const f /*:()=>boolean*/ = function () {
  debugger;
  const x /*:unknown*/ = $(100);
  const y /*:boolean*/ = !x;
  return y;
};
$(f);
$(f);
const tmpBoolTrampoline /*:unknown*/ = $(100);
if (tmpBoolTrampoline) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 100 );
  const c = !b;
  return c;
};
$( a );
$( a );
const d = $( 100 );
if (d) {
  $( "pass" );
}
else {
  $( "fail" );
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
