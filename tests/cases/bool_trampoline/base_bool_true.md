# Preval test case

# base_bool_true.md

> Bool trampoline > Base bool true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
>
> This case does not use the func arg.

## Input

`````js filename=intro
function f() {
  const x = $(100);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass');
else $('fail');
`````

## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  const x /*:unknown*/ = $(100);
  const y /*:boolean*/ = Boolean(x);
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

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const y = Boolean($(100));
  return y;
};
$(f);
$(f);
if ($(100)) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = $(100);
  const y = Boolean(x);
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
  const x = $(100);
  const y = Boolean(x);
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

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 100 );
  const c = Boolean( b );
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

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
