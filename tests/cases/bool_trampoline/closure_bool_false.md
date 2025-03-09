# Preval test case

# closure_bool_false.md

> Bool trampoline > Closure bool false
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
>
> This case does not use the func arg.

## Input

`````js filename=intro
let x = 1;
function f() {
  x = $(0);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('fail');
else $('pass');
$(x);
`````

## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  x = $(0);
  const y /*:boolean*/ = Boolean(x);
  return y;
};
let x /*:unknown*/ = 1;
$(f);
$(f);
x = $(0);
if (x) {
  $(`fail`);
  $(x);
} else {
  $(`pass`);
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  x = $(0);
  const y = Boolean(x);
  return y;
};
let x = 1;
$(f);
$(f);
x = $(0);
if (x) {
  $(`fail`);
  $(x);
} else {
  $(`pass`);
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  x = $(0);
  const y = Boolean(x);
  return y;
};
let x = 1;
$(f);
$(f);
if (f()) $(`fail`);
else $(`pass`);
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  x = $(0);
  const y = Boolean(x);
  return y;
};
let x = 1;
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`fail`);
  $(x);
} else {
  $(`pass`);
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = $( 0 );
  const c = Boolean( b );
  return c;
};
let b = 1;
$( a );
$( a );
b = $( 0 );
if (b) {
  $( "fail" );
  $( b );
}
else {
  $( "pass" );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 0
 - 4: 'pass'
 - 5: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
